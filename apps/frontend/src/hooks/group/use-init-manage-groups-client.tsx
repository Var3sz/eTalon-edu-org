import { useEffect, useMemo, useTransition } from 'react';
import useGetGroupsQuery from './use-get-groups-query';
import { GroupDto } from '@/models/Api';
import { updateGroupDataRequest } from '@/models/group/action/update-group-request';
import { UpdateGroupFormModel } from '@/models/group/types';
import { toast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function useInitManageGroupsClient(token: string) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();
  const groups = useGetGroupsQuery(token);

  const DeleteGroup = (data: GroupDto) => {
    startTransaction(async () => {
      const deletedDto = {
        id: data.id,
        description: data.description,
        isDeleted: 'Y',
      } as UpdateGroupFormModel;

      const deleteResponse = await updateGroupDataRequest(deletedDto, token);
      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['groups'] });
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
    url.searchParams.set('tab', 'groups');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return useMemo(
    () => ({
      groups,
      isPending,
      DeleteGroup,
    }),
    [groups, isPending, DeleteGroup]
  );
}
