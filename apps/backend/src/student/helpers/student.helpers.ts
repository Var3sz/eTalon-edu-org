import { Injectable } from '@nestjs/common';
import { NewStudentsDto } from 'src/api/consts/SAPI';
import { addTwoHoursToDate } from 'src/lib/helper';

import { CreateStudentDto, PaymentDto, StudentDto, StudentPaymentDto } from '../entities/student.entity';

@Injectable()
export class StudentHelpers {
  constructor() {}

  /**
   * Transforming student data form Sales Autopilot into a Database suitable format
   *
   * @param students - Student data which comes from Sales Autopilot
   * @returns - Student data suitable for the Database
   */
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

  /**
   * Transforming student data with attendance from Database into Dto format
   *
   * @param students - Student data which come form database
   * @returns - Student data suitable for the Dto
   */
  parseStudentsWithAttendance = (students: any[]): StudentDto[] => {
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
        // attendance: s.attendance.map((a) => ({
        //   lessonDateId: a.lessondateId,
        //   date: a.LessonDates?.date!,
        //   description: a.LessonDates?.description ?? '',
        //   attended: a.attended ?? false,
        // })),
        attendance: s.attendance.map((a) => ({
          lessonDateId: a.lessondateId,
          date: a.LessonDates?.date,
          description: a.LessonDates?.description ?? '',
          attended: a.attended ?? false,
        })),
      })
    );

    return studentDtos;
  };

  parsePayments = (students: any[]): StudentPaymentDto[] => {
    const payments = students.map((student) => {
      return {
        studentName: student.childName,
        Payments: student.payments.map((payment) => {
          return {
            invoiceDateId: payment.invoiceDateId,
            date: payment.InvoiceDates.date!,
            description: payment.InvoiceDates.description ?? '',
            billerId: payment.billerId,
            payed: payment.payed,
            amount: payment.amount,
            invoiceNumber: payment.invoiceNumber,
          } as PaymentDto;
        }),
      } as StudentPaymentDto;
    });

    return payments;
  };
}
