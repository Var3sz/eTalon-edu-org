import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';

import { InactivatePackage } from '@/api/models/serviceEndpoints/packages';
import { toast } from '@/components/ui/use-toast';

export default function useInitPackagesTableClient(token: string) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const inactivePackageFunction = async (packageId: number) => {
    startTransaction(async () => {
      const deleteResponse = await InactivatePackage<any, any>(packageId, token);

      if (deleteResponse.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['packages'] });
        toast({
          title: 'Sikeres törlés!',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Sikertelen törlés!',
          description: deleteResponse.status === 500 && deleteResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'details');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return useMemo(() => ({ isPending, inactivePackageFunction }), [isPending, inactivePackageFunction]);
}
