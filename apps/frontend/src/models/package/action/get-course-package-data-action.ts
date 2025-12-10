import { useQuery } from '@tanstack/react-query';

import { GetCoursePackageData } from '@/api/models/serviceEndpoints/packages';
import { FetchResponse } from '@/api/types/fetch-response';
import { CoursePackageRow } from '@/hooks/packages/use-init-package-assign-client';
import { PackageCourseAssignDto } from '@/models/Api';

type UseGetCoursePackageDataQueryModel = {
  type: string | null;
  locationId: number | null;
  token: string;
  onError: (response: FetchResponse<unknown>) => void;
};

export function useGetCoursePackageDataQuery({ type, locationId, token, onError }: UseGetCoursePackageDataQueryModel) {
  return useQuery({
    queryKey: ['course-package-data', { type, locationId }],
    queryFn: async () => {
      const resp = await GetCoursePackageData(type!, locationId!, token);
      if (resp.status !== 200 || !resp.data) {
        onError(resp);
        throw Error('Error-t dobunk');
      }

      const dto = Array.isArray(resp.data)
        ? (resp.data[0] as PackageCourseAssignDto)
        : (resp.data as PackageCourseAssignDto);

      const assignedMap = new Set<string>(dto.assignments?.map((a) => `${a.courseId}_${a.packageId}`) || []);

      const transformed: CoursePackageRow[] = dto.courses.map((course) => {
        const row: CoursePackageRow = {
          courseId: course.id,
          courseName: course.courseId,
        };

        dto.packages.forEach((pkg) => {
          const isAssigned = assignedMap.has(`${course.id}_${pkg.packageId}`);
          row[`pkg_${pkg.packageId}`] = isAssigned;
        });

        return row;
      });

      return transformed;
    },
    enabled: Boolean(type) && Boolean(locationId),
    staleTime: 60 * 60 * 1000,
  });
}
