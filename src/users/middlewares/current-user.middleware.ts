import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User; // Type defination in library
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware { // Middleware gets executed before Guards
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Inside use() method of CurrentUserMiddleware');
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user; // type correction of Request is done above
    }
    next();
  }
}
