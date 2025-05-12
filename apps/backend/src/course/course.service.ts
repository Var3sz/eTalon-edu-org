import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  ActiveCourseDto,
  CourseDto,
  CreateLessonDateDto,
  LessonDateDto,
  UpdateCourseDto,
  UpdateLessonDateDto,
} from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gives back all of the courses which are active (raw form)
   */
  async getAllActiveCourse(): Promise<CourseDto[]> {
    return await this.prisma.course.findMany({ where: { active: true } });
  }

  /**
   * Gives back all of the currently active courses
   * @returns {ActiveCourseDto[]} Currently active courses
   */
  async getActiveCourses(): Promise<ActiveCourseDto[]> {
    return this.prisma.activeCoursesView.findMany();
  }

  /**
   * Gives back all of the currently active courses with the packages and their prices
   * @returns {ActiveCourseDto[]} Currently active courses
   * TODO
   */
  async getActiveCoursesWithPackageInformation(): Promise<ActiveCourseDto[]> {
    try {
      return this.prisma.activeCoursesView.findMany();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gives back a course specified by an id
   * @param id Id of the course which needs to be returned
   * @returns The corresponding course
   */
  async getCourseById(id: number): Promise<CourseDto> {
    try {
      const course = await this.prisma.course.findUnique({ where: { id } });

      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }

      return course;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update one course with the given id
   * @param updateBody Body of the request with the updated course
   * @param id Id of the course that we want to update
   * @returns Updated course
   */
  async updateCourse(updateBody: UpdateCourseDto, id: number): Promise<CourseDto> {
    try {
      return this.prisma.course.update({
        where: { id },
        data: updateBody,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create one or more courses, if one fails, then we rollback the others as well, so we stay consistent
   * @param createBody - Array of courses that we would like to create
   * @returns The created courses
   */
  async createCourses(createBody: UpdateCourseDto[]): Promise<CourseDto[]> {
    try {
      return this.prisma.$transaction(createBody.map((course) => this.prisma.course.create({ data: course })));
    } catch (error) {
      throw error;
    }
  }

  async getCourseLessonDates(courseId: number): Promise<LessonDateDto[]> {
    return this.prisma.lessonDates.findMany({
      where: {
        CourseLessonDates: {
          some: {
            courseId,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async createLessonDates(createBody: CreateLessonDateDto): Promise<LessonDateDto[]> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create new lesson dates
      const lessonDates = await Promise.all(
        createBody.dateInfo.map((body) =>
          tx.lessonDates.create({
            data: body,
          })
        )
      );

      // 2. Create course-lesson date relations
      await Promise.all(
        lessonDates.map((lessonDate) =>
          tx.courseLessonDates.create({
            data: {
              courseId: createBody.courseId,
              lessondateId: lessonDate.id,
            },
          })
        )
      );

      // 3. Get all students participating in the course
      const participants = await tx.participant.findMany({
        where: { courseId: createBody.courseId },
        select: { studentId: true },
      });

      // 4. Create attendance records for each student and each lesson date
      await Promise.all(
        participants.flatMap((participant) =>
          lessonDates.map((lessonDate) =>
            tx.attendance.create({
              data: {
                lessondateId: lessonDate.id,
                studentId: participant.studentId,
                attended: false,
              },
            })
          )
        )
      );

      return lessonDates;
    });
  }

  async updateLessonDate(updateBody: UpdateLessonDateDto): Promise<LessonDateDto> {
    return await this.prisma.lessonDates.update({
      where: { id: updateBody.id },
      data: updateBody,
    });
  }
}
