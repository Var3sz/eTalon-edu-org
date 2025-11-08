import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import LocationColumns from '../columns/location/location-columns';
import { SimpleTable } from '../tables/simple-table';
import { useEffect } from 'react';

type ManageLocationsClientModel = {
  token: string;
};

export default function ManageLocationsClient({ token }: ManageLocationsClientModel) {
  const locations = useGetLocationsQuery(token);

  const locationColumns = LocationColumns(token);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'locations');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div>
      <SimpleTable columns={locationColumns} defaultData={locations ?? []} />
    </div>
  );
}
