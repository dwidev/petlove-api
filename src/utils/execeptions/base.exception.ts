import { HttpException } from '@nestjs/common';

export abstract class BaseException extends HttpException {
  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
  }
}
