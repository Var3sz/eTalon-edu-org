import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { NewStudentsDto } from 'src/api/consts/SAPI';

import {
  PaymentsDto,
  StudentAttendanceDto,
  StudentDetailsDTO,
  UpdateAttendanceDto,
  UpdateStudentDetailsDTO,
} from './entities/student.entity';
import { StudentHelpers } from './helpers/student.helpers';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private studentHelpers: StudentHelpers
  ) {}

  /**
   * @returns All of the students from the database
   */
  async getAllStudents() {
    return this.prisma.student.findMany();
  }

  /**
   * @returns Date of enrollment of the last student added
   */
  async getLatestSubDate(): Promise<string | null> {
    const latestStudent = await this.prisma.student.findFirst({
      orderBy: {
        subdate: 'desc',
      },
      select: {
        subdate: true,
      },
    });

    return latestStudent ? latestStudent.subdate.toISOString() : null;
  }

  /**
   * Inserts the new students to the database and links them to he CourseDates and InvoiceDates
   *
   * @param students Students to be inserted to the database
   */
  async insertStudents(students: NewStudentsDto[]) {
    const parsedStudents = this.studentHelpers.parseStudents(students);

    return this.prisma.$transaction(async (tx) => {
      for (const student of parsedStudents) {
        // Diák létrehozása
        const createdStudent = await tx.student.create({ data: student });

        // A beszúrt hallgató csomagkódjához tartozó kurzus lekérdezése
        const courses = await tx.course_Package.findMany({
          where: {
            packageId: student.packageCode,
          },
          include: {
            Course: {
              include: {
                CourseLessonDates: {
                  include: {
                    LessonDates: true,
                  },
                },
                CouseInvoiceDates: {
                  include: {
                    InvoiceDates: true,
                  },
                },
              },
            },
          },
        });

        // Hallgató hozzárendelése a megfelelő kurzushoz és az ahhoz tartozó kurzus dátumokhoz
        for (const course of courses) {
          await tx.participant.create({
            data: {
              courseId: course.courseId,
              studentId: createdStudent.id,
            },
          });

          const lessonDates = course.Course.CourseLessonDates.map((cld) => cld.LessonDates);

          await Promise.all(
            lessonDates.map((ld) =>
              tx.attendance.create({
                data: {
                  studentId: createdStudent.id,
                  lessondateId: ld.id,
                  attended: false,
                },
              })
            )
          );

          // Hallgató hozzárendelése a számlázási időszakokhoz
          const invoiceDates = course.Course.CouseInvoiceDates.map((cid) => cid.InvoiceDates);
          await Promise.all(
            invoiceDates.map((id) =>
              tx.payment.create({
                data: {
                  studentId: createdStudent.id,
                  invoiceDateId: id.id,
                  payed: false,
                  billerId: null,
                  amount: 0,
                  invoiceNumber: null,
                },
              })
            )
          );
        }
      }
    });
  }

  /**
   * Return the student attendace data
   * @param id - Id for the course which we are asking about attendance
   * @returns - Student and attendace data
   */
  async getStudentsByCourseWithAttendances(id: number): Promise<StudentAttendanceDto> {
    const lessonDates = await this.prisma.courseLessonDates.findMany({
      where: { courseId: id },
      select: { lessondateId: true },
    });

    const lessonDateIds = lessonDates.map((ld) => ld.lessondateId);

    const students = await this.prisma.student.findMany({
      where: { Participant: { some: { courseId: id } } },
      include: {
        Participant: { where: { courseId: id }, select: { Course: { select: { courseId: true } } } },
        attendance: {
          where: { lessondateId: { in: lessonDateIds } },
          include: { LessonDates: true },
          orderBy: { LessonDates: { date: 'asc' } },
        },
      },
    });

    // Szöveges CourseId!
    const courseCode = students[0]?.Participant[0]?.Course.courseId ?? '';
    const studentDtos = this.studentHelpers.parseStudentsWithAttendance(students);

    return {
      courseId: courseCode,
      students: studentDtos,
    };
  }

  /**
   * Returns the student payment data
   * @param id - Id for the course which we are asking about payments
   * @returns - Student name and payment data
   */
  async getStudentsByCourseWithPaymentData(id: number): Promise<PaymentsDto> {
    const invoiceDates = await this.prisma.courseInvoiceDates.findMany({
      where: { courseId: id },
      select: { invoiceDateid: true },
    });

    const invoiceDateIds = invoiceDates.map((invoiceDate) => invoiceDate.invoiceDateid);

    const students = await this.prisma.student.findMany({
      where: { Participant: { some: { courseId: id } } },
      include: {
        Participant: { where: { courseId: id }, select: { Course: { select: { courseId: true } } } },
        Payment: {
          where: { invoiceDateId: { in: invoiceDateIds } },
          include: { InvoiceDates: true },
          orderBy: { InvoiceDates: { date: 'asc' } },
        },
      },
    });

    // Szöveges CourseId!
    const courseCode = students[0]?.Participant[0]?.Course.courseId ?? '';
    const payments = this.studentHelpers.parsePayments(students);

    return {
      courseId: courseCode,
      payments: payments,
    };
  }

  /**
   * TODO - tesztelni, hogy megfelelően működik-e nagyméretű adathalmazra is (kb. 20 diák, 13 dátum)
   * @param updates Attendance records that we would like to update
   * @returns
   */
  async updateAttendanceBulk(updates: UpdateAttendanceDto[]) {
    return this.prisma.$transaction(async (tx) => {
      const results = [];

      for (const { studentId, lessondateId, attended } of updates) {
        try {
          const updated = await tx.attendance.update({
            where: {
              studentId_lessondateId: { studentId, lessondateId },
            },
            data: { attended },
          });
          results.push(updated);
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
            throw new Error(`A jelenléti rekord nem található a diákra=${studentId}, és a dátumra=${lessondateId}`);
          }
          throw e;
        }
      }

      return results;
    });
  }

  /**
   * Updates student data in the database - TODO: bekötni a SAPI-ba is
   * @param updateBody - Data coming from the Frontend
   * @returns - Updated student data
   */
  async updateStudentDetails(updateBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
    return await this.prisma.student.update({
      where: { id: updateBody.id },
      data: updateBody,
    });
  }
}
