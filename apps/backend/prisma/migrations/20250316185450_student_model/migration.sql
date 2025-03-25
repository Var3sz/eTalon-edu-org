/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "sapId" INTEGER NOT NULL,
    "parentMail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "parentMobile" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
