/*
  Warnings:

  - You are about to drop the column `courseDateId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `maxHeadcount` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `billingTypeId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `children` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `childrenMail` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `vatNumber` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `BillingType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseDates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course_CourseDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course_Students` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sapId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maxHeadCount` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `childName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageCode` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageType` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sapId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentKey` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionCookie` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_courseDateId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Course_CourseDate" DROP CONSTRAINT "Course_CourseDate_courseDateId_fkey";

-- DropForeignKey
ALTER TABLE "Course_CourseDate" DROP CONSTRAINT "Course_CourseDate_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course_Students" DROP CONSTRAINT "Course_Students_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course_Students" DROP CONSTRAINT "Course_Students_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_billingTypeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "courseDateId",
ADD COLUMN     "lessondateId" INTEGER,
ALTER COLUMN "studentId" DROP NOT NULL,
ALTER COLUMN "attended" DROP NOT NULL,
ALTER COLUMN "attended" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "maxHeadcount",
DROP COLUMN "price",
ADD COLUMN     "maxHeadCount" INTEGER NOT NULL,
ALTER COLUMN "courseId" SET DATA TYPE VARCHAR,
ALTER COLUMN "description" SET DATA TYPE VARCHAR,
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "endTime" SET DATA TYPE VARCHAR,
ALTER COLUMN "headcount" DROP DEFAULT,
ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "startTime" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "description" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "description" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "billingTypeId",
DROP COLUMN "children",
DROP COLUMN "childrenMail",
DROP COLUMN "vatNumber",
ADD COLUMN     "billingAddressTypeId" INTEGER,
ADD COLUMN     "childGrade" INTEGER,
ADD COLUMN     "childMail" VARCHAR,
ADD COLUMN     "childName" VARCHAR NOT NULL,
ADD COLUMN     "childTAJ" VARCHAR,
ADD COLUMN     "coupon" VARCHAR,
ADD COLUMN     "discount" VARCHAR,
ADD COLUMN     "discount2" VARCHAR,
ADD COLUMN     "disease" BOOLEAN DEFAULT false,
ADD COLUMN     "diseaseDesc" VARCHAR,
ADD COLUMN     "packageCode" VARCHAR NOT NULL,
ADD COLUMN     "packageType" VARCHAR NOT NULL,
ADD COLUMN     "sapId" INTEGER NOT NULL,
ADD COLUMN     "specialDiet" BOOLEAN DEFAULT false,
ADD COLUMN     "specialDietDesc" VARCHAR,
ADD COLUMN     "subdate" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "vatNum" VARCHAR,
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR,
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR,
ALTER COLUMN "billCompany" SET DATA TYPE VARCHAR,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR,
ALTER COLUMN "zip" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR,
ALTER COLUMN "mobile" DROP NOT NULL,
ALTER COLUMN "mobile" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "agentKey" VARCHAR NOT NULL,
ADD COLUMN     "sessionCookie" VARCHAR NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "password" SET DATA TYPE VARCHAR;

-- DropTable
DROP TABLE "BillingType";

-- DropTable
DROP TABLE "CourseDates";

-- DropTable
DROP TABLE "Course_CourseDate";

-- DropTable
DROP TABLE "Course_Students";

-- CreateTable
CREATE TABLE "BillingAddressType" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "BillingAddressType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseLessonDates" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER,
    "lessondateId" INTEGER,

    CONSTRAINT "CourseLessonDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_Package" (
    "id" SERIAL NOT NULL,
    "packageId" VARCHAR NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Course_Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "LessonDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "packageId" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "type" VARCHAR NOT NULL,
    "locationId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "InvoiceDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInvoiceDates" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER,
    "invoiceDateid" INTEGER,

    CONSTRAINT "CourseInvoiceDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "invoiceDateId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "billerId" INTEGER NOT NULL,
    "payed" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,
    "invoiceNumber" VARCHAR NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_packageId_key" ON "Package"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_description_key" ON "Group"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Location_description_key" ON "Location"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Student_sapId_key" ON "Student"("sapId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_billingAddressTypeId_fkey" FOREIGN KEY ("billingAddressTypeId") REFERENCES "BillingAddressType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lessondateId_fkey" FOREIGN KEY ("lessondateId") REFERENCES "LessonDates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseLessonDates" ADD CONSTRAINT "CourseLessonDates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseLessonDates" ADD CONSTRAINT "CourseLessonDates_lessondateId_fkey" FOREIGN KEY ("lessondateId") REFERENCES "LessonDates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Course_Package" ADD CONSTRAINT "Course_Package_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Course_Package" ADD CONSTRAINT "Course_Package_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("packageId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseInvoiceDates" ADD CONSTRAINT "CourseInvoiceDates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseInvoiceDates" ADD CONSTRAINT "CourseInvoiceDates_invoiceDateid_fkey" FOREIGN KEY ("invoiceDateid") REFERENCES "InvoiceDates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceDateId_fkey" FOREIGN KEY ("invoiceDateId") REFERENCES "InvoiceDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billerId_fkey" FOREIGN KEY ("billerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
