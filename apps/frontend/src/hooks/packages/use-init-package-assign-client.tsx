import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from '@/components/ui/use-toast';
import CheckboxTableColumn from '@/components/tables/columns/components/input-columns/checkbox-input-column';
import { AssignPackageToCourseDto, PackageCourseAssignDto } from '@/models/Api';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/hidden-table-column';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import { AssingPackagesToCoursesRequest } from '@/models/package/action/assing-packages-to-course-action';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCoursePackageDataQuery } from '@/models/package/action/get-course-package-data-action';
import { FetchResponse } from '@/api/types/fetch-response';

export type CoursePackageRow = {
  courseId: number;
  courseName: string;
  [pkgKey: `pkg_${string}`]: boolean;
};

export type PackageAssignFormModel = {
  assignments: CoursePackageRow[];
  Helpers: {
    inEdit: boolean;
  };
};

type CoursePackageData = {
  courseId: number;
  courseName: string;
  packages: Array<{
    packageId: number;
    packageName: string;
    assigned: boolean;
  }>;
};

type UseCoursePackageFormDataModel = {
  type: string | null;
  locationId: number | null;
  token: string;
};

export default function useCoursePackageFormData({ type, locationId, token }: UseCoursePackageFormDataModel) {
  const [isPending, startTransition] = useTransition();
  const [rawData, setRawData] = useState<CoursePackageRow[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<PackageAssignFormModel>({
    defaultValues: { assignments: [], Helpers: { inEdit: false } },
  });

  const onError = (response: FetchResponse<unknown>) => {
    toast({
      variant: 'destructive',
      title: 'Hiba a lekérdezés során!',
      description: response.status === 500 && response.error.Message,
    });
  };

  const { data, isLoading } = useGetCoursePackageDataQuery({ type, locationId, token, onError });

  useEffect(() => {
    if (data) {
      setRawData(data);
      form.reset({ assignments: data, Helpers: { inEdit: false } });
    }
  }, [data]);

  const columns: ColumnDef<CoursePackageRow>[] = useMemo(() => {
    if (rawData.length === 0) return [];

    const sample = rawData[0];
    const pkgKeys = Object.keys(sample).filter((k) => k.startsWith('pkg_')) as `pkg_${number}`[];

    return [
      HiddenTableColumn<CoursePackageRow>({
        id: 'courseId',
        accessorKey: 'courseId',
      }),
      TextTableColumn<CoursePackageRow>({
        id: 'courseName',
        accessorKey: 'courseName',
        headerTitle: 'Kurzus azonosító',
      }),
      ...pkgKeys.map((key) =>
        CheckboxTableColumn<PackageAssignFormModel, CoursePackageRow>({
          accessorKey: `assignments[index].${key}`,
          id: key,
          headerTitle: key.replace('pkg_', ''),
          formControl: form.control,
          size: 80,
          inEdit: form.getValues().Helpers.inEdit,
          disabled: false,
        })
      ),
    ];
  }, [rawData, form.control, form.getValues().Helpers.inEdit]);

  const onValidSubmit = (values: any) => {
    startTransition(async () => {
      const assignments: CoursePackageRow[] = values.assignments;

      const columnCounts: Record<string, number> = {};

      assignments.forEach((row) => {
        Object.entries(row).forEach(([key, val]) => {
          if (key.startsWith('pkg_') && val === true) {
            columnCounts[key] = (columnCounts[key] || 0) + 1;
          }
        });
      });

      // Ellenőrzés
      const maxPerColumn = type === 'C' ? 2 : 1;
      const violated = Object.entries(columnCounts).find(([, count]) => count > maxPerColumn);

      if (violated) {
        const [pkgKey, count] = violated;
        toast({
          title: 'Érvénytelen hozzárendelés!',
          description: `A(z) ${pkgKey.replace('pkg_', '')} csomag túl sok kurzushoz van hozzárendelve (${count}/${maxPerColumn}).`,
          variant: 'destructive',
        });
        return;
      }

      // DTO generálás
      const dtos: AssignPackageToCourseDto[] = assignments.flatMap((row: CoursePackageRow) => {
        const { courseId, courseName, ...rest } = row;
        return Object.entries(rest).map(([pkgKey, val]) => ({
          courseId,
          packageId: pkgKey.replace('pkg_', ''),
          assign: Boolean(val),
        }));
      });

      const assingResponse = await AssingPackagesToCoursesRequest(dtos, token);
      if (assingResponse.status === 200 || assingResponse.status === 201) {
        toast({
          title: 'Sikeres mentés!',
          variant: 'success',
        });
        form.setValue('Helpers.inEdit', false);
        queryClient.invalidateQueries({
          queryKey: ['course-package-data', { type, locationId }],
        });
      } else {
        toast({
          title: 'Sikertelen mentés!',
          description: assingResponse.status === 500 && assingResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  const onInvalidSubmit = () => {
    toast({
      title: 'Sikertelen mentés!',
      description: 'Hibás adatoK!',
      variant: 'destructive',
    });
  };

  useEffect(() => {
    if (!form.getValues().Helpers.inEdit) form.reset({ assignments: rawData, Helpers: { inEdit: false } });
  }, [form.getValues().Helpers.inEdit]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'assign');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return {
    form,
    isPending,
    isLoading,
    columns,
    data: rawData,
    onValidSubmit,
    onInvalidSubmit,
  };
}
