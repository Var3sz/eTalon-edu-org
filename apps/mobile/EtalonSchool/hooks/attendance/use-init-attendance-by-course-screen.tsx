import { useEffect, useMemo, useState } from 'react';
import useGetAttendanceDataByCourseQuery from './use-get-attendance-data-by-course-query';
import { CourseAttendanceResponse, Student } from '../../models/attendance/types';
import { useQueryClient } from '@tanstack/react-query';

type UseInitAttendanceByCourseScreenProps = {
  id: number;
  getAccessToken: () => Promise<string | null>;
};

export default function useInitAttendanceByCourseScreen({ id, getAccessToken }: UseInitAttendanceByCourseScreenProps) {
  const queryClient = useQueryClient();

  // Alapadatok lekérdezése
  const { data: attendanceDataResponse } = useGetAttendanceDataByCourseQuery({
    courseId: id,
    getAccessToken: getAccessToken,
  });
  const attendanceData: CourseAttendanceResponse | null =
    attendanceDataResponse?.status === 200 && attendanceDataResponse.data ? attendanceDataResponse.data : null;

  const [courseData, setCourseData] = useState<CourseAttendanceResponse | null>(null);

  useEffect(() => {
    setCourseData(attendanceData);
  }, [attendanceData]);

  // LessonDates
  const lessons = useMemo(() => {
    if (!courseData || courseData.students.length === 0) return [];
    return courseData.students[0].attendance;
  }, [courseData]);

  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const selectedLesson = lessons[selectedLessonIndex];

  const handlePrev = () => {
    setSelectedLessonIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedLessonIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : prev));
  };

  const handleToggleAttendance = (studentId: number) => {
    setCourseData((prev) => {
      if (!prev) return prev;
      const lessonId = selectedLesson.lessonDateId;

      return {
        ...prev,
        students: prev.students.map((s) => {
          if (s.id !== studentId) return s;
          return {
            ...s,
            attendance: s.attendance.map((a) => (a.lessonDateId === lessonId ? { ...a, attended: !a.attended } : a)),
          };
        }),
      };
    });

    // TODO: itt majd API call a módosítás mentésére
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);

  const handleOpenStudentDialog = (student: Student) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  return useMemo(
    () => ({
      courseData,
      lessons,
      selectedLesson,
      selectedLessonIndex,
      selectedStudent,
      studentDialogOpen,
      queryClient,
      handlePrev,
      handleNext,
      handleOpenStudentDialog,
      handleToggleAttendance,
      setStudentDialogOpen,
    }),
    [
      courseData,
      lessons,
      selectedLesson,
      selectedLessonIndex,
      selectedStudent,
      studentDialogOpen,
      queryClient,
      handlePrev,
      handleNext,
      handleOpenStudentDialog,
      handleToggleAttendance,
      setStudentDialogOpen,
    ]
  );
}
