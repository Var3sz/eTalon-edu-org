import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ExceptionLocales } from '../locales/exception-locales';
import { CourseDetailsDto, CoursesDTO } from './entities/course.entity';

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
}
