/*
  Warnings:

  - You are about to drop the column `group` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `headCount` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `maxHeadCount` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoursePackages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxHeadcount` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_CoursePackages" DROP CONSTRAINT "_CoursePackages_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursePackages" DROP CONSTRAINT "_CoursePackages_B_fkey";

-- DropIndex
DROP INDEX "Course_courseId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "group",
DROP COLUMN "headCount",
DROP COLUMN "location",
DROP COLUMN "maxHeadCount",
DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "headcount" INTEGER,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "maxHeadcount" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "Students";

-- DropTable
DROP TABLE "_CoursePackages";

-- DropEnum
DROP TYPE "CourseStatus";

-- DropEnum
DROP TYPE "GroupTypes";

-- DropEnum
DROP TYPE "Location";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
