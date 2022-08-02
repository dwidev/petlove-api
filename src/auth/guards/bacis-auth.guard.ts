import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.headers);

    const basicAuth: String = req.headers.authorization;
    console.log(basicAuth);

    if (basicAuth == undefined) {
      throw new UnauthorizedException();
    }
    const basic = Buffer.from(basicAuth.split(' ')[1], 'base64').toString(
      'utf-8',
    );
    if (basic != 'client:password') {
      throw new UnauthorizedException();
    }

    console.log('AMAN');

    return true;
  }
}
