import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';

import { DatePatterns } from '@/api/consts/date-patterns';
import useGetCourseDetailsById from '@/hooks/courses/use-get-course-details-by-id-query';
import { formatDateCustom } from '@/lib/utils';
import { StudentAttendanceDto, StudentDto } from '@/models/Api';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { AttendanceDateColumnType } from '@/models/students/types';
import { UpdateAttendancesRequest } from '@/models/students/action/update-attendances-action';
import { useQueryClient } from '@tanstack/react-query';

type UseInitCourseClientProps = {
  courseId: string;
};

export type StudentAttendance = {
  studentId: number;
  children: string;
  email: string;
  lastname: string;
  firstname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  vatNumber: string;
  childrenMail: string;
  mobile: string;
  billingTypeId: number;
  [date: string]: boolean | string | number;
};

type AttendanceForm = {
  studentId: number;
  [date: string]: boolean | number;
};

export default function useInitCourseClient({ courseId }: UseInitCourseClientProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const { data: studentsDataResponse } = useGetCourseDetailsById(Number(courseId));
  const course: StudentAttendanceDto | null =
    studentsDataResponse.status === 200 && studentsDataResponse.data ? studentsDataResponse.data : null;

  const [CourseId, setCourseId] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<StudentAttendance[]>([]);
  const [attendanceOnly, setAttendanceOnly] = useState<AttendanceForm[]>();

  const form = useForm<{ attendance: AttendanceForm[] }>({
    defaultValues: {
      attendance: [],
    },
  });

  const onValidSubmit = (data: { attendance: AttendanceForm[] }) => {
    startTransaction(async () => {
      const payload = data.attendance.flatMap(({ studentId, ...rest }) => {
        return Object.entries(rest).map(([lessondateId, attended]) => ({
          studentId,
          lessondateId: Number(lessondateId),
          attended: Boolean(attended),
        }));
      });

      const updateResponse = await UpdateAttendancesRequest(payload);

      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['course-details-by-id', Number(courseId)] });
        toast({ variant: 'success', title: 'Sikeres frissítés!', description: 'A jelenlétek frissítése sikeres!' });
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
      setCourseId(course.courseId);

      // Extract and normalize attendance dates
      const allDates = course.students.flatMap((student) =>
        student.attendance.map((a) => ({
          lessonDateId: a.lessonDateId,
          date: formatDateCustom(a.date, DatePatterns.DATEURI)!,
          description: a.description ?? '',
        }))
      );

      // Remove duplicates by date
      const uniqueDateMap = new Map<string, { lessonDateId: number; date: string; description: string }>();
      for (const entry of allDates) {
        if (!uniqueDateMap.has(entry.date)) {
          uniqueDateMap.set(entry.date, entry);
        }
      }

      // Add synthetic id
      const dateColumns = Array.from(uniqueDateMap.values()).map((entry, index) => ({
        lessondateId: entry.lessonDateId,
        date: entry.date,
        description: entry.description,
      }));

      const data = course.students.map((student) => {
        const row: StudentAttendance = {
          studentId: student.id,
          children: student.childName,
          email: student.email,
          lastname: student.lastname,
          firstname: student.firstname,
          billCompany: student.billCompany,
          city: student.city,
          zip: student.zip,
          address: student.address,
          vatNumber: student.vatNum,
          childrenMail: student.childMail,
          mobile: student.mobile,
          billingTypeId: student.billingAddressTypeId,
        };

        dateColumns.forEach(({ lessondateId }) => {
          const match = student.attendance.find((a) => a.lessonDateId === lessondateId);
          row[lessondateId] = match?.attended ?? false;
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
      form.reset({ attendance: attendanceOnly });
    }
  }, [attendanceOnly]);

  const resetForm = () => {
    form.reset({ attendance: attendanceOnly });
  };

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit, resetForm, CourseId, courseData, dateCols }),
    [form, isPending, onInvalidSubmit, onValidSubmit, resetForm, CourseId, courseData, dateCols]
  );
}
