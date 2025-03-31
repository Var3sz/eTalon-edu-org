import { useEffect, useMemo, useState } from 'react';

import { DatePatterns } from '@/api/consts/date-patterns';
import useGetCourseDetailsById from '@/hooks/courses/use-get-course-details-by-id-query';
import { formatDateCustom } from '@/lib/utils';
import { CourseDetailsDto } from '@/models/Api';

type UseInitCourseClientProps = {
  courseId: string;
};

export type StudentAttendance = {
  id: number;
  studentId: number;
  courseId: string;
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

export default function useInitCourseClient({ courseId }: UseInitCourseClientProps) {
  const { data: studentsDataResponse } = useGetCourseDetailsById(Number(courseId));
  const course: CourseDetailsDto | null =
    studentsDataResponse.status === 200 && studentsDataResponse.data ? studentsDataResponse.data : null;

  const [courseData, setCourseData] = useState<StudentAttendance[]>([]);

  const [dateCols, setDateCols] = useState<{ id: number; date: string; description: string }[]>([]);

  useEffect(() => {
    if (course !== null) {
      const id = course.id;
      const courseId = course.courseId;
      const dateColumns = course.courseDates.map((cd) => ({
        id: cd.courseDate.id,
        date: formatDateCustom(cd.courseDate.date, DatePatterns.DATEURI)!,
        description: cd.courseDate.description,
      }));

      setDateCols(dateColumns);

      const data = course.students.map((studentEntry) => {
        const student = studentEntry.student;

        const row: StudentAttendance = {
          id,
          courseId,
          studentId: student.id,
          children: student.children,
          email: student.email,
          lastname: student.lastname,
          firstname: student.firstname,
          billCompany: student.billCompany,
          city: student.city,
          zip: student.zip,
          address: student.address,
          vatNumber: student.vatNumber,
          childrenMail: student.childrenMail,
          mobile: student.mobile,
          billingTypeId: student.billingTypeId,
        };

        dateColumns.forEach(({ id: courseDateId, date }) => {
          const attendance = student.attendance?.find((a) => a.courseDateId === courseDateId);
          if (attendance?.attended) {
            row[date] = 'Y';
          } else {
            row[date] = 'N';
          }
        });

        return row;
      });
      setCourseData(data);
    }
  }, [course]);

  return useMemo(() => ({ courseData, dateCols }), [courseData, dateCols]);
}
