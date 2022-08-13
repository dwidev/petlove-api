import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectAccountUuid = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.uuid;
  },
);
