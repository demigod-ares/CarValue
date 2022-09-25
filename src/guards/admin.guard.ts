import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log('Inside canActivate() method of AdminGuard');
    const request = context.switchToHttp().getRequest();
    if (request.currentUser) {
      return request.currentUser.admin;
    }
    return false;
  }
}
