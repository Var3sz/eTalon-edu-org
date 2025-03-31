import { useEffect, useMemo, useState } from 'react';

import useGetCourseDetailsById from '@/hooks/courses/use-get-course-details-by-id-query';
import { CourseDetailsDto } from '@/models/Api';

type UseInitCourseClientProps = {
  courseId: string;
};

export type StudentAttendance = {
  id: number;
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

  useEffect(() => {
    if (course !== null) {
      const courseId = course.courseId;
      const courseDates = course.courseDates.map((cd) => ({
        id: cd.courseDate.id,
        date: cd.courseDate.date,
      }));

      const data = course.students.map((studentEntry) => {
        const student = studentEntry.student;

        const row: StudentAttendance = {
          courseId,
          id: student.id,
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

        courseDates.forEach(({ id: courseDateId, date }) => {
          const attendance = student.attendance?.find((a) => a.courseDateId === courseDateId);
          if (attendance?.attended) {
            row[date] = '✓';
          } else {
            row[date] = attendance?.attended === false ? '✗' : '';
          }
        });

        return row;
      });
      setCourseData(data);
    }
  }, [course]);

  useEffect(() => {
    console.log(courseData);
  }, [courseData]);

  return useMemo(() => ({ courseData }), [courseData]);
}
