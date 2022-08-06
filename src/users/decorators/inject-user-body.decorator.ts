import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectUserToBody = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.body.user = { id: request.user.id };
    return request.body;
  },
);
