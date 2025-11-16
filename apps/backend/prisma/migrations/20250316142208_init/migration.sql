yarn run v1.22.4
$ C:\suli\msc_2\dipterv\eTalon-edu-org\node_modules\.bin\prisma migrate diff \ --from-empty \ --to-schema-datamodel prisma/schema.prisma \ --script
-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseId" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "endTime" VARCHAR NOT NULL,
    "groupId" INTEGER NOT NULL,
    "headcount" INTEGER,
    "locationId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(6) NOT NULL,
    "startTime" VARCHAR NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "maxHeadCount" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "billCompany" VARCHAR,
    "city" VARCHAR,
    "zip" INTEGER,
    "address" VARCHAR,
    "mobile" VARCHAR,
    "billingAddressTypeId" INTEGER,
    "childGrade" INTEGER,
    "childMail" VARCHAR,
    "childName" VARCHAR NOT NULL,
    "childTAJ" VARCHAR,
    "coupon" VARCHAR,
    "discount" VARCHAR,
    "discount2" VARCHAR,
    "disease" BOOLEAN DEFAULT false,
    "diseaseDesc" VARCHAR,
    "packageCode" VARCHAR NOT NULL,
    "packageType" VARCHAR NOT NULL,
    "sapId" INTEGER NOT NULL,
    "specialDiet" BOOLEAN DEFAULT false,
    "specialDietDesc" VARCHAR,
    "subdate" TIMESTAMP(6) NOT NULL,
    "vatNum" VARCHAR,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER,
    "attended" BOOLEAN DEFAULT false,
    "lessondateId" INTEGER,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,
    "isDeleted" CHAR,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,
    "isDeleted" CHAR,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "roleId" INTEGER NOT NULL,
    "agentKey" VARCHAR,
    "sessionCookie" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

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
    "billerId" INTEGER,
    "payed" BOOLEAN,
    "amount" INTEGER,
    "invoiceNumber" VARCHAR,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_sapId_key" ON "Student"("sapId");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_student_lesson_unique" ON "Attendance"("studentId", "lessondateId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_description_key" ON "Group"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Location_description_key" ON "Location"("description");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "idx_course_package_course_id" ON "Course_Package"("courseId");

-- CreateIndex
CREATE INDEX "idx_course_package_package_id" ON "Course_Package"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "course_package_unique" ON "Course_Package"("packageId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Package_packageId_key" ON "Package"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "studentId_invoiceDateId_unique" ON "Payment"("studentId", "invoiceDateId");

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
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billerId_fkey" FOREIGN KEY ("billerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceDateId_fkey" FOREIGN KEY ("invoiceDateId") REFERENCES "InvoiceDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

Done in 1.77s.
