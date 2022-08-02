import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import e from 'express';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { use } from 'passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    if (info) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('token ini udh expired');
      } else {
        if (err || info || !user) {
          throw new UnauthorizedException();
        }
      }
    }

    return user;
  }
}
