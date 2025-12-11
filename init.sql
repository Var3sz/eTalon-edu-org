-- Mock data INSERT script for the given schema
-- Lookup táblák -> core entitások -> kapcsoló táblák
BEGIN;

-- 1) BillingAddressType
INSERT INTO public."BillingAddressType" (id, description) VALUES
  (1, 'Magánszemély'),
  (2, 'Cég'),
  (3, 'Egyéb');

-- 2) Group
INSERT INTO public."Group" (id, description, "isDeleted") VALUES
  (1, 'Scratch kezdő', 'N'),
  (2, 'Scratch haladó', 'N');

-- 3) Location
INSERT INTO public."Location" (id, description, "isDeleted") VALUES
  (1, 'Budapest - Oktatóközpont', 'N'),
  (2, 'Online - Zoom', 'N');

-- 4) Role
INSERT INTO public."Role" (id, name) VALUES
  (1, 'admin'),
  (2, 'teacher'),
  (3, 'accountant');

-- 5) User
INSERT INTO public."User" (id, email, name, password, "roleId", "agentKey", "sessionCookie") VALUES
  (1, 'admin@example.com', 'Admin User', 'hashed_pw_1', 1, 'AGENT-ADMIN-1', NULL),
  (2, 'teacher@example.com', 'Tanár Tímea', 'hashed_pw_2', 2, 'AGENT-TEACHER-1', NULL),
  (3, 'accountant@example.com', 'Könyvelő Kálmán', 'hashed_pw_3', 3, 'AGENT-ACC-1', NULL);

-- 6) Package
INSERT INTO public."Package" (id, "packageId", price, type, "locationId", active, "groupId") VALUES
  (1, 'PKG-SCRATCH-KEZDO-BP', 60000, 'tanfolyam', 1, true, 1),
  (2, 'PKG-SCRATCH-HALADO-BP', 65000, 'tanfolyam', 1, true, 2),
  (3, 'PKG-SCRATCH-ONLINE',    55000, 'tanfolyam', 2, true, 1);

-- 7) Course
INSERT INTO public."Course" (
  id, "courseId", description, active, "endTime", "groupId",
  headcount, "locationId", "startDate", "startTime", locked, "maxHeadCount"
) VALUES
  (1, 'COURSE-2025-KEZDO-HETFO',
   'Scratch kezdő hétfő délután', true, '18:30', 1,
   8, 1, '2025-02-03 16:00:00', '17:00', false, 10),

  (2, 'COURSE-2025-KEZDO-SZERDA',
   'Scratch kezdő szerda délután', true, '18:30', 1,
   6, 1, '2025-02-05 16:00:00', '17:00', false, 10),

  (3, 'COURSE-2025-HALADO-ONLINE',
   'Scratch haladó online', true, '19:30', 2,
   5, 2, '2025-02-04 17:00:00', '18:00', false, 12);

-- 8) LessonDates
INSERT INTO public."LessonDates" (id, date, description) VALUES
  (1, '2025-02-03 16:00:00', 'Kezdő hétfő 1. alkalom'),
  (2, '2025-02-10 16:00:00', 'Kezdő hétfő 2. alkalom'),
  (3, '2025-02-05 16:00:00', 'Kezdő szerda 1. alkalom'),
  (4, '2025-02-12 16:00:00', 'Kezdő szerda 2. alkalom'),
  (5, '2025-02-04 17:00:00', 'Haladó online 1. alkalom');

-- 9) InvoiceDates
INSERT INTO public."InvoiceDates" (id, date, description) VALUES
  (1, '2025-01-15 00:00:00', 'Februári tanfolyamok díja'),
  (2, '2025-02-15 00:00:00', 'Márciusi tanfolyamok díja');

-- 10) Student
INSERT INTO public."Student" (
  id, email, lastname, firstname, "billCompany", city, zip, address,
  mobile, "billingAddressTypeId", "childGrade", "childMail", "childName",
  "childTAJ", coupon, discount, discount2, disease, "diseaseDesc",
  "packageCode", "packageType", "sapId", "specialDiet", "specialDietDesc",
  subdate, "vatNum"
) VALUES
  (1,
   'szulo1@example.com', 'Kiss', 'Anna', 'Kiss Kft.', 'Budapest', 1111, 'Fő utca 1.',
   '+3611111111', 2, 4, 'gyerek1@example.com', 'Kiss Bence',
   '123456789', 'KUPON10', '10%', NULL, false, NULL,
   'PKG-SCRATCH-KEZDO-BP', 'tanfolyam', 1001, false, NULL,
   '2025-01-10 10:00:00', 'HU12345678'),

  (2,
   'szulo2@example.com', 'Nagy', 'Judit', NULL, 'Budapest', 2222, 'Kis utca 2.',
   '+3622222222', 1, 5, 'gyerek2@example.com', 'Nagy Lili',
   NULL, NULL, NULL, NULL, false, NULL,
   'PKG-SCRATCH-HALADO-BP', 'tanfolyam', 1002, true, 'Laktózérzékeny',
   '2025-01-11 11:30:00', NULL),

  (3,
   'szulo3@example.com', 'Tóth', 'Péter', NULL, 'Szeged', 3333, 'Duna utca 3.',
   '+3633333333', 1, 3, NULL, 'Tóth Marci',
   NULL, 'KUPON5', NULL, NULL, false, NULL,
   'PKG-SCRATCH-ONLINE', 'tanfolyam', 1003, false, NULL,
   '2025-01-12 09:15:00', NULL);

-- 11) Course_Package (kapcsolat a kurzusok és csomagok között)
INSERT INTO public."Course_Package" (id, "packageId", "courseId") VALUES
  (1, 'PKG-SCRATCH-KEZDO-BP', 1),
  (2, 'PKG-SCRATCH-KEZDO-BP', 2),
  (3, 'PKG-SCRATCH-ONLINE',   3);

-- 12) CourseLessonDates (kurzus–óra kapcsolatok)
INSERT INTO public."CourseLessonDates" (id, "courseId", "lessondateId") VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 5);

-- 13) CourseInvoiceDates (kurzus–számlázási dátum kapcsolatok)
INSERT INTO public."CourseInvoiceDates" (id, "courseId", "invoiceDateid") VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 2);

-- 14) Participant (kurzus résztvevői)
INSERT INTO public."Participant" (id, "courseId", "studentId") VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 3, 3);

-- 15) Attendance (jelenlét)
INSERT INTO public."Attendance" (id, "studentId", attended, "lessondateId") VALUES
  (1, 1, true, 1),
  (2, 1, false, 2),
  (3, 2, true, 1),
  (4, 3, true, 5);

-- 16) Payment (fizetések)
INSERT INTO public."Payment" (
  id, "invoiceDateId", "studentId", "billerId",
  payed, amount, "invoiceNumber", "amountToBePayed"
) VALUES
  (1, 1, 1, 3, true,  60000, 'INV-2025-0001', 60000),
  (2, 1, 2, 3, false, 30000, 'INV-2025-0002', 60000),
  (3, 2, 3, 3, true,  55000, 'INV-2025-0003', 55000);

-- -------------------------------------------------------------------
-- Számlálók (sequence-ek) beállítása, hogy ne ütközzön a következő INSERT
-- -------------------------------------------------------------------
SELECT pg_catalog.setval('public."BillingAddressType_id_seq"', 3, true);
SELECT pg_catalog.setval('public."Group_id_seq"',              2, true);
SELECT pg_catalog.setval('public."Location_id_seq"',           2, true);
SELECT pg_catalog.setval('public."Role_id_seq"',               3, true);
SELECT pg_catalog.setval('public."User_id_seq"',               3, true);
SELECT pg_catalog.setval('public."Package_id_seq"',            3, true);
SELECT pg_catalog.setval('public."Course_id_seq"',             3, true);
SELECT pg_catalog.setval('public."LessonDates_id_seq"',        5, true);
SELECT pg_catalog.setval('public."InvoiceDates_id_seq"',       2, true);
SELECT pg_catalog.setval('public."Student_id_seq"',            3, true);
SELECT pg_catalog.setval('public."Course_Package_id_seq"',     3, true);
SELECT pg_catalog.setval('public."CourseLessonDates_id_seq"',  5, true);
SELECT pg_catalog.setval('public."CourseInvoiceDates_id_seq"', 3, true);
SELECT pg_catalog.setval('public."Participant_id_seq"',        3, true);
SELECT pg_catalog.setval('public."Attendance_id_seq"',         4, true);
SELECT pg_catalog.setval('public."Payment_id_seq"',            3, true);

COMMIT;
