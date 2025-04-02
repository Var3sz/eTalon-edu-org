import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { SaveResultDto } from '../common/results.entity';
import { ExceptionLocales } from '../locales/exception-locales';
import { CourseDetailsDto, CoursesDTO, CreateCourseDateDto } from './entities/course.entity';
import { RawCourseDTO, UpsertCourseDTO } from './entities/create.course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getActiveCourses(): Promise<CoursesDTO[]> {
    try {
      return this.prisma.courseSummaryView.findMany({ where: { active: true } });
    } catch (error) {
      throw new InternalServerErrorException(ExceptionLocales.INTERNAL_SERVER_ERROR);
    }
  }

  async getCourseDetailsById(id: number): Promise<CourseDetailsDto> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        select: {
          id: true,
          courseId: true,
          students: {
            include: {
              student: {
                select: {
                  id: true,
                  children: true,
                  email: true,
                  lastname: true,
                  firstname: true,
                  billCompany: true,
                  city: true,
                  zip: true,
                  address: true,
                  vatNumber: true,
                  childrenMail: true,
                  mobile: true,
                  billingTypeId: true,
                  attendance: {
                    where: {
                      courseDate: {
                        courses: {
                          some: {
                            courseId: id,
                          },
                        },
                      },
                    },
                    select: {
                      attended: true,
                      courseDateId: true,
                    },
                  },
                },
              },
            },
          },
          courseDates: {
            include: {
              courseDate: {
                select: {
                  id: true,
                  date: true,
                  description: true,
                  attendance: {
                    select: {
                      studentId: true,
                      attended: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!course) {
        throw new NotFoundException();
      }

      return course;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(ExceptionLocales.INTERNAL_SERVER_ERROR);
    }
  }

  async addMultipleCourseDatesToCourse(courseId: number, newDates: CreateCourseDateDto[]) {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const date of newDates) {
          // Create CourseDates
          const newCourseDate = await tx.courseDates.create({
            data: {
              date: new Date(date.date),
              description: date.description,
            },
          });

          // Link to course
          await tx.course_CourseDate.create({
            data: {
              courseId,
              courseDateId: newCourseDate.id,
            },
          });
        }
      });

      return { message: 'All course dates created and linked successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create and link all course dates.');
    }
  }

  async upsertMultipleCourses(courses: UpsertCourseDTO[]): Promise<SaveResultDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const course of courses) {
          await tx.course.upsert({
            where: { id: course.id ?? -1 },
            update: {
              courseId: course.courseId,
              description: course.description,
              price: course.price,
              active: course.active,
              endTime: course.endTime,
              groupId: course.groupId,
              headcount: course.headCount,
              locationId: course.locationId,
              maxHeadcount: course.maxHeadcount,
              startDate: course.startDate,
              startTime: course.startTime,
              locked: course.locked,
            },
            create: {
              courseId: course.courseId,
              description: course.description,
              price: course.price,
              active: course.active,
              endTime: course.endTime,
              groupId: course.groupId,
              headcount: course.headCount,
              locationId: course.locationId,
              maxHeadcount: course.maxHeadcount,
              startDate: course.startDate,
              startTime: course.startTime,
              locked: course.locked,
            },
          });
        }
      });

      return {
        saved: true,
        title: 'Sikeres mentés!',
        description: 'Kurzusok frissítése sikeres',
      };
    } catch (error) {
      return {
        saved: false,
        title: 'Sikertelen mentés!',
        description: error.message,
      };
    }
  }

  async getCoursesForModification(): Promise<RawCourseDTO[]> {
    return this.prisma.course.findMany({ where: { active: true } });
  }
}
