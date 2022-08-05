import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { HttpStatus } from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = HttpStatus.BAD_REQUEST;
    const message = this.getErrorMessage(exception);

    response.status(code).json({
      message,
      code,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private getErrorMessage = (exception: BadRequestException): string => {
    const response: any = exception.getResponse();
    const resMessage: any = response.message;

    var message: string;

    if (resMessage instanceof Array) {
      message = resMessage.length != 0 ? resMessage[0] : exception.toString();
    } else {
      message = resMessage;
    }

    return message;
  };
}
