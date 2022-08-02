import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IJwtPayload,
  IJwtPayloadWithRefresToken,
} from '../interface/jwt-payload.interface';
import { ITokenResponse } from '../interface/token.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: any, payload: IJwtPayload): IJwtPayloadWithRefresToken {
    const refreshToken = req.headers.authorization.split(' ')[1];
    return { ...payload, refreshToken };
  }
}
