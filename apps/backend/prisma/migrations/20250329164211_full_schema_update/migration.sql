/*
  Warnings:

  - You are about to drop the column `courseId` on the `CourseDates` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseDates" DROP CONSTRAINT "CourseDates_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "headcount" SET DEFAULT 0,
ALTER COLUMN "locked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "CourseDates" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "Course_CourseDate" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "courseDateId" INTEGER NOT NULL,

    CONSTRAINT "Course_CourseDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_Students" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Course_Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "courseDateId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "attended" BOOLEAN NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course_CourseDate" ADD CONSTRAINT "Course_CourseDate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_CourseDate" ADD CONSTRAINT "Course_CourseDate_courseDateId_fkey" FOREIGN KEY ("courseDateId") REFERENCES "CourseDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Students" ADD CONSTRAINT "Course_Students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Students" ADD CONSTRAINT "Course_Students_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseDateId_fkey" FOREIGN KEY ("courseDateId") REFERENCES "CourseDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
