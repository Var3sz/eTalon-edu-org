import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { NewStudentsDto } from 'src/api/consts/SAPI';
import { CreateStudentDto, StudentAttendanceDto, StudentDto } from './entities/student.entity';
import { addTwoHoursToDate } from 'src/lib/helper';
import { cp } from 'node:fs';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getAllStudents() {
    return this.prisma.student.findMany();
  }

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

  async insertStudents(students: NewStudentsDto[]) {
    const parsedStudents = this.parseStudents(students);

    return this.prisma.$transaction(async (tx) => {
      for (const s of parsedStudents) {
        // Diák létrehozása
        const createdStudent = await tx.student.create({ data: s });

        // Az beszúrt hallgató csomagkódjához tartozó kurzus lekérdezése
        const coursePackages = await tx.course_Package.findMany({
          where: {
            packageId: s.packageCode,
          },
          include: {
            Course: {
              include: {
                CourseLessonDates: {
                  include: {
                    LessonDates: true,
                  },
                },
              },
            },
          },
        });

        // Hallgató hozzárendelése a megfelelő kurzushoz és az ahhoz tartozó kurzus dátumokhoz
        for (const cp of coursePackages) {
          await tx.participant.create({
            data: {
              courseId: cp.courseId,
              studentId: createdStudent.id,
            },
          });

          const lessonDates = cp.Course.CourseLessonDates.map((cld) => cld.LessonDates);

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
        }
      }
    });
  }

  async getStudentsByCourseWithAttendances(courseId: number): Promise<StudentAttendanceDto> {
    const lessonDates = await this.prisma.courseLessonDates.findMany({
      where: {
        courseId: courseId,
      },
      select: {
        lessondateId: true,
      },
    });

    const lessonDateIds = lessonDates.map((ld) => ld.lessondateId);

    const students = await this.prisma.student.findMany({
      where: {
        Participant: {
          some: {
            courseId: courseId,
          },
        },
      },
      include: {
        Participant: {
          where: {
            courseId: courseId,
          },
          select: {
            Course: {
              select: {
                courseId: true,
              },
            },
          },
        },
        attendance: {
          where: {
            lessondateId: {
              in: lessonDateIds,
            },
          },
          include: {
            LessonDates: true,
          },
        },
      },
    });

    const courseCode = students[0]?.Participant[0]?.Course.courseId ?? '';

    const studentDtos = students.map(
      (s): StudentDto => ({
        id: s.id,
        sapId: s.sapId,
        subdate: s.subdate,
        email: s.email,
        firstname: s.firstname,
        lastname: s.lastname,
        billCompany: s.billCompany,
        city: s.city,
        zip: s.zip,
        address: s.address,
        coupon: s.coupon,
        vatNum: s.vatNum,
        billingAddressTypeId: s.billingAddressTypeId,
        childName: s.childName,
        childMail: s.childMail,
        childGrade: s.childGrade,
        childTAJ: s.childTAJ,
        specialDiet: s.specialDiet,
        specialDietDesc: s.specialDietDesc,
        mobile: s.mobile,
        packageType: s.packageType,
        packageCode: s.packageCode,
        disease: s.disease,
        diseaseDesc: s.diseaseDesc,
        discount: s.discount,
        discount2: s.discount2,
        attendance: s.attendance.map((a) => ({
          id: a.id,
          date: a.LessonDates?.date!,
          description: a.LessonDates?.description ?? '',
          attended: a.attended ?? false,
        })),
      })
    );

    return {
      courseId: courseCode,
      students: studentDtos,
    };
  }

  /* async updateStudentDetails(id: number, requestBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
    try {
      return await this.prisma.student.update({
        where: { id },
        data: requestBody,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`A(z) ${id} azonosítójú diák nem található.`);
      }
      throw new InternalServerErrorException('Nem várt hiba történt');
    }
  } */

  parseStudents = (students: NewStudentsDto[]): CreateStudentDto[] => {
    const parsedStudents: CreateStudentDto[] = students.map((s) => ({
      sapId: s.id,
      subdate: addTwoHoursToDate(s.subdate),
      email: s.email,
      firstname: s.mssys_firstname,
      lastname: s.mssys_lastname,
      billCompany: s.mssys_bill_company,
      city: s.mssys_bill_city,
      zip: s.mssys_bill_zip.trim() === '' ? null : parseInt(s.mssys_bill_zip, 10),
      address: s.mssys_bill_address,
      coupon: s.mssys_coupon,
      vatNum: s.mssys_vat_number,
      billingAddressTypeId:
        s.mssys_billing_address_type.trim() === '' ? null : parseInt(s.mssys_billing_address_type, 10),
      childName: s.gyermek_neve,
      childMail: s.gyermek_email,
      childGrade: s.gyermek_osztalyfoka.trim() === '' ? null : parseInt(s.gyermek_osztalyfoka, 10),
      childTAJ: s.gyermek_taj,
      specialDiet: s.kulonleges_etrendet_ker.toLowerCase() === 'igen',
      specialDietDesc: s.kulonleges_etrend,
      mobile: s.mssys_mobile,
      packageType: s.csomag_tipus,
      packageCode: s.csomag_kod,
      disease: s.betegsege_van.toLowerCase() === 'igen',
      diseaseDesc: s.betegseg,
      discount: s.kedvezmeny_1,
      discount2: s.kedvezmeny_2,
    }));
    return parsedStudents;
  };
}
