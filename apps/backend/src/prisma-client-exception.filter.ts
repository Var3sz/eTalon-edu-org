import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2002':
        status = HttpStatus.CONFLICT;
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2005':
      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2007':
      case 'P2010':
      case 'P2019':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2008':
      case 'P2009':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2011':
      case 'P2012':
      case 'P2013':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2014':
      case 'P2015':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2016':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2017':
      case 'P2018':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2021':
      case 'P2022':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2023':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2024':
        status = HttpStatus.REQUEST_TIMEOUT;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2026':
      case 'P2030':
      case 'P2031':
        status = HttpStatus.NOT_IMPLEMENTED;
        break;
      case 'P2027':
      case 'P2028':
      case 'P2029':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2033':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2034':
        status = HttpStatus.CONFLICT;
        break;
      default:
        // Fallback to base class if error code is unknown
        super.catch(exception, host);
        return;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.code,
    });
  }
}
