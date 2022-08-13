import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/utils/execeptions/base.exception';

export class UserAlreadyException extends BaseException {
  constructor() {
    super('Users already exist', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends BaseException {
  constructor() {
    super('Users not found', HttpStatus.NOT_FOUND);
  }
}
