import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccountDto, AccountUuidDto } from '../dto/account.dto';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import { ITokenResponse } from '../interface/token.interface';

export const InjectTokenPayload = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const tokenPayload: IJwtPayload = request.user;
    const account: AccountUuidDto = { uuid: tokenPayload.uuid };
    request.body.account = account;
    return request.body;
  },
);
