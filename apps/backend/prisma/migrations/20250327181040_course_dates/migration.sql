-- CreateTable
CREATE TABLE "CourseDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseDates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseDates" ADD CONSTRAINT "CourseDates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
