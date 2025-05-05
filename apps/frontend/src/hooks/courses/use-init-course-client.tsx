import { useEffect, useMemo, useState } from 'react';

import { DatePatterns } from '@/api/consts/date-patterns';
import useGetCourseDetailsById from '@/hooks/courses/use-get-course-details-by-id-query';
import { formatDateCustom } from '@/lib/utils';
import { StudentAttendanceDto, StudentDto } from '@/models/Api';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

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
  const { data: studentsDataResponse } = useGetCourseDetailsById(Number(courseId));
  const course: StudentAttendanceDto | null =
    studentsDataResponse.status === 200 && studentsDataResponse.data ? studentsDataResponse.data : null;

  const [CourseId, setCourseId] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<StudentAttendance[]>([]);
  const [dateCols, setDateCols] = useState<{ id: number; date: string; description: string }[]>([]);
  const [attendanceOnly, setAttendanceOnly] = useState<AttendanceForm[]>();

  const form = useForm<{ attendance: AttendanceForm[] }>({
    defaultValues: {
      attendance: [],
    },
  });

  const onValidSubmit = (data: { attendance: AttendanceForm[] }) => {
    console.log(JSON.stringify(data));
  };

  const onInvalidSubmit = (e: any) => {
    console.error(e);
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  useEffect(() => {
    if (course !== null) {
      setCourseId(course.courseId);

      // Extract and normalize attendance dates
      const allDates = course.students.flatMap((student) =>
        student.attendance.map((a) => ({
          date: formatDateCustom(a.date, DatePatterns.DATEURI)!,
          description: a.description ?? '',
        }))
      );

      // Remove duplicates by date
      const uniqueDateMap = new Map<string, { date: string; description: string }>();
      for (const entry of allDates) {
        if (!uniqueDateMap.has(entry.date)) {
          uniqueDateMap.set(entry.date, entry);
        }
      }

      // Add synthetic id
      const dateColumns = Array.from(uniqueDateMap.values()).map((entry, index) => ({
        id: index + 1, // synthetic ID
        date: entry.date,
        description: entry.description,
      }));

      setDateCols(dateColumns);

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

        dateColumns.forEach(({ date }) => {
          const match = student.attendance.find((a) => formatDateCustom(a.date, DatePatterns.DATEURI) === date);
          row[date] = match?.attended ? 'Y' : 'N';
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
          if (/\d{4}-\d{2}-\d{2}/.test(key)) {
            attendance[key] = student[key] === 'Y';
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

  return useMemo(
    () => ({ form, onInvalidSubmit, onValidSubmit, CourseId, courseData, dateCols }),
    [form, onInvalidSubmit, onValidSubmit, CourseId, courseData, dateCols]
  );
}
