import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // we need interceptor to get currentUser (Interceptor will take the session.userId and find it in database using UserService)
    console.log('Inside CurrentUser decorator');
    // console.log('Context is : ', context); // large JSON
    const request = context.switchToHttp().getRequest();
    // console.log('Request is : ', request); // large JSON
    return request.currentUser; // we get the user entity
  },
);
