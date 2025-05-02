import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import {
  CourseDetailsDto,
  ActiveCourseDto,
  CreateCourseDateDto,
  CourseDto,
  UpdateCourseDto,
} from './entities/course.entity';
import { RawCourseDTO, UpsertCourseDTO } from './entities/create.course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

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

  /* async addMultipleCourseDatesToCourse(courseId: number, newDates: CreateCourseDateDto[]) {
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

  async upsertMultipleCourses(courses: UpsertCourseDTO[]): Promise<any> {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const course of courses) {
          if (course.id) {
            const existing = await tx.course.findUnique({ where: { id: course.id } });
            if (existing) {
              await tx.course.update({
                where: { id: course.id },
                data: {
                  courseId: course.courseId,
                  description: course.description,
                  price: course.price,
                  active: course.active,
                  endTime: course.endTime,
                  groupId: course.groupId,
                  headcount: course.headCount,
                  locationId: course.locationId,
                  maxHeadcount: course.maxHeadcount,
                  startDate: new Date(course.startDate),
                  startTime: course.startTime,
                  locked: course.locked,
                },
              });
              continue;
            }
          }

          await tx.course.create({
            data: {
              courseId: course.courseId,
              description: course.description,
              price: course.price,
              active: course.active,
              endTime: course.endTime,
              groupId: course.groupId,
              headcount: course.headCount,
              locationId: course.locationId,
              maxHeadcount: course.maxHeadcount,
              startDate: new Date(course.startDate),
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
  } */
}
