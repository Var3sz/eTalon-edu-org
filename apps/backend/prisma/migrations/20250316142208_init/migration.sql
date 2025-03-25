-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('ACTIVE', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "GroupTypes" AS ENUM ('R_MATEK', 'R_MAGYAR', 'R_SZOBELI');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ER', 'SZ', 'KE', 'RO');

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "packageCode" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "group" "GroupTypes" NOT NULL,
    "status" "CourseStatus" NOT NULL,
    "courseId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "headCount" INTEGER NOT NULL,
    "maxHeadCount" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoursePackages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CoursePackages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CoursePackages_B_index" ON "_CoursePackages"("B");

-- AddForeignKey
ALTER TABLE "_CoursePackages" ADD CONSTRAINT "_CoursePackages_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePackages" ADD CONSTRAINT "_CoursePackages_B_fkey" FOREIGN KEY ("B") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
