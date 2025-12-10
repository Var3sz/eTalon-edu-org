import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { DatePatterns } from '@/api/consts/date-patterns';
import { toast } from '@/components/ui/use-toast';
import useGetCourseDetailsById from '@/hooks/courses/use-get-course-details-by-id-query';
import { formatDateCustom } from '@/lib/utils';
import { StudentAttendanceDto, StudentDetailsDTO } from '@/models/Api';
import { UpdateAttendancesRequest } from '@/models/students/action/update-attendances-action';
import { AttendanceDateColumnType } from '@/models/students/types';
import {
  StudentAttendanceFormData,
  StudentAttendanceFormDefault,
} from '@/validation/default-values/student/student-attendace-form-default';

type UseInitCourseClientProps = {
  courseId: string;
  token: string;
};

export type StudentAttendance = {
  studentId: number;
  [date: string]: boolean | string | number;
} & StudentDetailsDTO;

export type AttendanceForm = {
  studentId: number;
  [date: string]: boolean | number;
};

export type StudentAttendanceForm = {
  attendance: AttendanceForm[];
  Helpers: {
    inEdit: boolean;
  };
};

export default function useInitCourseClient({ courseId, token }: UseInitCourseClientProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  // jelenléti adatok lekérdezése az adott kurzushoz
  const { data: studentsDataResponse } = useGetCourseDetailsById(courseId, token);
  const course: StudentAttendanceDto | null =
    studentsDataResponse?.status === 200 && studentsDataResponse.data ? studentsDataResponse.data : null;

  // Állapotok
  const [courseName, setCourseName] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<StudentAttendance[]>([]);
  const [attendanceOnly, setAttendanceOnly] = useState<AttendanceForm[]>();

  // Form a jelenlétek kezelésére
  const form = useForm<StudentAttendanceForm>({
    defaultValues: StudentAttendanceFormDefault(),
  });

  const dateCols: AttendanceDateColumnType[] = useMemo(() => {
    if (!course) return [];

    const allDates = course.students.flatMap((student) =>
      student.attendance.map((a) => ({
        lessonDateId: a.lessonDateId,
        date: formatDateCustom(a.date, DatePatterns.DATEURI)!,
        description: a.description ?? '',
      }))
    );

    const uniqueDateMap = new Map<string, AttendanceDateColumnType>();
    for (const entry of allDates) {
      if (!uniqueDateMap.has(entry.date)) {
        uniqueDateMap.set(entry.date, entry);
      }
    }

    return Array.from(uniqueDateMap.values());
  }, [course]);

  useEffect(() => {
    if (course !== null) {
      setCourseName(course.courseId);

      const allDates = course.students.flatMap((student) =>
        student.attendance.map((a) => ({
          lessonDateId: a.lessonDateId,
          date: formatDateCustom(a.date, DatePatterns.DATEURI)!,
          description: a.description ?? '',
        }))
      );

      const uniqueDateMap = new Map<string, { lessonDateId: number; date: string; description: string }>();
      for (const entry of allDates) {
        if (!uniqueDateMap.has(entry.date)) {
          uniqueDateMap.set(entry.date, entry);
        }
      }

      const dateColumns = Array.from(uniqueDateMap.values()).map((entry) => ({
        lessondateId: entry.lessonDateId,
        date: entry.date,
        description: entry.description,
      }));

      const data = course.students.map((student) => {
        const { attendance, ...details } = student;

        const row: StudentAttendance = {
          studentId: details.id,
          ...details,
        };

        dateColumns.forEach(({ lessondateId }) => {
          const att = student.attendance.find((a) => a.lessonDateId === lessondateId);
          row[lessondateId] = Boolean(att?.attended);
        });

        return row;
      });

      setCourseData(data);
    }
  }, [course]);

  useEffect(() => {
    setAttendanceOnly(
      courseData.map((student) => {
        const { studentId, ...rest } = student;

        const attendance: Record<string, boolean> = {};

        for (const key in rest) {
          const maybeId = Number(key);
          if (Number.isInteger(maybeId)) {
            attendance[maybeId] = rest[maybeId] === true;
          }
        }

        return {
          studentId,
          ...attendance,
        };
      })
    );
  }, [courseData]);

  useEffect(() => {
    if (attendanceOnly && attendanceOnly.length > 0) {
      form.reset(StudentAttendanceFormData(attendanceOnly));
    }
  }, [attendanceOnly]);

  useEffect(() => {
    if (!form.getValues().Helpers.inEdit && attendanceOnly && attendanceOnly.length > 0) {
      form.reset(StudentAttendanceFormData(attendanceOnly));
    }
  }, [form.getValues().Helpers.inEdit]);

  // Backend hívás a jelenléti adatok frissítésére
  const onValidSubmit = (data: StudentAttendanceForm) => {
    startTransaction(async () => {
      const payload = data.attendance.flatMap(({ studentId, ...rest }) => {
        return Object.entries(rest).map(([lessondateId, attended]) => ({
          studentId,
          lessondateId: Number(lessondateId),
          attended: Boolean(attended),
        }));
      });

      const updateResponse = await UpdateAttendancesRequest(payload, token);

      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['course-details-by-id', courseId] });
        toast({ variant: 'success', title: 'Sikeres frissítés!', description: 'A jelenlétek frissítése sikeres!' });
        form.setValue('Helpers.inEdit', false);
      } else {
        toast({
          title: 'Sikertelen frissítés!',
          description: updateResponse.status === 500 && updateResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  const onInvalidSubmit = (e: any) => {
    console.error(e);
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit, courseName, courseData, dateCols }),
    [form, isPending, onInvalidSubmit, onValidSubmit, courseName, courseData, dateCols]
  );
}
