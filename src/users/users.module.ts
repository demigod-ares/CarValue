import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // TypeORM for DB
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // { // Interceptor gets executed after a Guard, hence Middleware is used
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // }
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) { // Interceptor gets executed after a Guard, hence Middleware is used
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
