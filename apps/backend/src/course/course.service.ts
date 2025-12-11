import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  ActiveCourseDto,
  CourseDto,
  CreateInvoiceDateDto,
  CreateLessonDateDto,
  InvoiceDateDto,
  LessonDateDto,
  UpdateCourseDto,
  UpdateInvoiceDateDto,
  UpdateLessonDateDto,
} from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gives back all of the courses which are active (raw form)
   */
  async getAllActiveCourse(): Promise<CourseDto[]> {
    const courses = await this.prisma.course.findMany({
      where: { active: true },
      orderBy: { startDate: 'asc' },
      include: {
        group: {
          select: {
            description: true,
          },
        },
        location: {
          select: {
            description: true,
          },
        },
      },
    });

    return courses.map((course) => {
      return {
        ...course,
        location: course.location.description,
        group: course.group.description,
      };
    });
  }

  /**
   * Gives back all of the currently active courses
   * @returns {ActiveCourseDto[]} Currently active courses
   */
  async getActiveCourses(): Promise<ActiveCourseDto[]> {
    return this.prisma.activeCoursesView.findMany({ orderBy: { startDate: 'asc' } });
  }

  /**
   * Gives back a course specified by an id
   * @param id Id of the course which needs to be returned
   * @returns The corresponding course
   */
  async getCourseById(id: number): Promise<CourseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        group: {
          select: {
            description: true,
          },
        },
        location: {
          select: {
            description: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course not found (id:  ${id})`);
    }

    return { ...course, location: course.location.description, group: course.group.description };
  }

  /**
   * Update one course with the given id
   * @param updateBody Body of the request with the updated course
   * @param id Id of the course that we want to update
   * @returns Updated course
   */
  async updateCourse(updateBody: UpdateCourseDto, id: number): Promise<CourseDto> {
    const updated = await this.prisma.course.update({
      where: { id },
      data: updateBody,
      include: {
        group: {
          select: {
            description: true,
          },
        },
        location: {
          select: {
            description: true,
          },
        },
      },
    });

    return { ...updated, location: updated.location.description, group: updated.group.description };
  }

  /**
   * Create one or more courses, if one fails, then we rollback the others as well, so we stay consistent
   * @param createBody - Array of courses that we would like to create
   * @returns The created courses
   */
  async createCourses(createBody: UpdateCourseDto[]): Promise<CourseDto[]> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdCourses: CourseDto[] = [];

        for (const course of createBody) {
          const created = await tx.course.create({
            data: course,
            include: {
              group: {
                select: {
                  description: true,
                },
              },
              location: {
                select: {
                  description: true,
                },
              },
            },
          });

          createdCourses.push({ ...created, location: created.location.description, group: created.group.description });
        }

        return createdCourses;
      });
    } catch (error) {
      console.error('Failed to create courses:', error);
      throw error;
    }
  }

  async getCourseLessonDates(courseId: number): Promise<LessonDateDto[]> {
    return this.prisma.lessonDates.findMany({
      where: { CourseLessonDates: { some: { courseId } } },
      orderBy: { date: 'asc' },
    });
  }

  async getCourseInvoiceDates(courseId: number): Promise<InvoiceDateDto[]> {
    return this.prisma.invoiceDates.findMany({
      where: { CourseInvoiceDates: { some: { courseId } } },
      orderBy: { date: 'asc' },
    });
  }

  async createLessonDates(createBody: CreateLessonDateDto): Promise<LessonDateDto[]> {
    return this.prisma.$transaction(async (tx) => {
      const lessonDates: LessonDateDto[] = [];

      for (const body of createBody.dateInfo) {
        const created = await tx.lessonDates.create({ data: body });
        lessonDates.push(created);
      }

      for (const lessonDate of lessonDates) {
        await tx.courseLessonDates.create({
          data: {
            courseId: createBody.courseId,
            lessondateId: lessonDate.id,
          },
        });
      }

      const participants = await tx.participant.findMany({
        where: { courseId: createBody.courseId },
        select: { studentId: true },
      });

      for (const participant of participants) {
        for (const lessonDate of lessonDates) {
          await tx.attendance.create({
            data: {
              lessondateId: lessonDate.id,
              studentId: participant.studentId,
              attended: false,
            },
          });
        }
      }

      return lessonDates;
    });
  }

  async createInvoiceDates(createBody: CreateInvoiceDateDto): Promise<InvoiceDateDto[]> {
    return this.prisma.$transaction(async (tx) => {
      const invoiceDates: InvoiceDateDto[] = [];

      for (const body of createBody.dateInfo) {
        const created = await tx.invoiceDates.create({ data: body });
        invoiceDates.push(created);
      }

      for (const invoiceDate of invoiceDates) {
        await tx.courseInvoiceDates.create({
          data: {
            courseId: createBody.courseId,
            invoiceDateid: invoiceDate.id,
          },
        });
      }

      const participants = await tx.participant.findMany({
        where: { courseId: createBody.courseId },
        select: { studentId: true },
      });

      for (const participant of participants) {
        for (const invoiceDate of invoiceDates) {
          await tx.payment.create({
            data: {
              invoiceDateId: invoiceDate.id,
              studentId: participant.studentId,
              payed: false,
              amount: 0,
              invoiceNumber: null,
              billerId: null,
            },
          });
        }
      }

      return invoiceDates;
    });
  }

  async updateLessonDate(updateBody: UpdateLessonDateDto): Promise<LessonDateDto> {
    return await this.prisma.lessonDates.update({ where: { id: updateBody.id }, data: updateBody });
  }

  async updateInvoiceDate(updateBody: UpdateInvoiceDateDto): Promise<InvoiceDateDto> {
    return await this.prisma.invoiceDates.update({ where: { id: updateBody.id }, data: updateBody });
  }

  async inactivateCourseById(id: number): Promise<CourseDto> {
    const updated = await this.prisma.course.update({
      where: { id: id },
      data: { active: false },
      include: {
        group: {
          select: {
            description: true,
          },
        },
        location: {
          select: {
            description: true,
          },
        },
      },
    });

    return { ...updated, location: updated.location.description, group: updated.group.description };
  }
}
