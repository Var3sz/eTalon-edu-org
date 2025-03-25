/*
  Warnings:

  - The values [ACTIVE,ARCHIVE] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [R_MATEK,R_MAGYAR,R_SZOBELI] on the enum `GroupTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('AKT', 'ARC');
ALTER TABLE "Course" ALTER COLUMN "status" TYPE "CourseStatus_new" USING ("status"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "CourseStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GroupTypes_new" AS ENUM ('R_Matek', 'R_Magyar', 'R_Szobeli');
ALTER TABLE "Course" ALTER COLUMN "group" TYPE "GroupTypes_new" USING ("group"::text::"GroupTypes_new");
ALTER TYPE "GroupTypes" RENAME TO "GroupTypes_old";
ALTER TYPE "GroupTypes_new" RENAME TO "GroupTypes";
DROP TYPE "GroupTypes_old";
COMMIT;
