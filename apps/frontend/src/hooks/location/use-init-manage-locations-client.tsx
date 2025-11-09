import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';

import { toast } from '@/components/ui/use-toast';
import { LocationDto } from '@/models/Api';
import { updateLocationDataRequest } from '@/models/location/action/update-location-request';
import { UpdateLocationFormModel } from '@/models/location/type';

import useGetLocationsQuery from './use-get-locations-query';

export default function useInitManageLocationsClient(token: string) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();
  const locations = useGetLocationsQuery(token);

  const DeleteLocation = (data: LocationDto) => {
    startTransaction(async () => {
      const deletedDto = {
        id: data.id,
        description: data.description,
        isDeleted: 'Y',
      } as UpdateLocationFormModel;

      const deleteResponse = await updateLocationDataRequest(deletedDto, token);
      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['locations'] });
        toast({
          title: 'Sikeres frissítés!',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Sikertelen törlés!',
          description: deleteResponse.status === 500 && deleteResponse.error.Message,
        });
      }
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'locations');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return useMemo(
    () => ({
      locations,
      isPending,
      DeleteLocation,
    }),
    [locations, isPending, DeleteLocation]
  );
}
