import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MessagesModule } from './file-edit/messages.module';
import { LoggerModule } from './logger/logger.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // .env.development OR .env.test
    }),
    TypeOrmModule.forRootAsync({
      // keep forRootAsync method when using process.env above. Test is using memory as database
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report], // config is done in individual modules
          synchronize: true, // only used for development env. When set to true, it helps with auto-migrations when you change entity.
        };
      },
    }),
    // .forRoot({ // remove forRoot method when using process.env above. Test is using memory as database
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report], // config is done in individual modules
    //   synchronize: true, // only used for development env. When set to true, it helps with auto-migrations when you change entity.
    // }),
    UsersModule,
    ReportsModule,
    MessagesModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Validation pipe added to app.module instead of main.ts AS RECOMENDED by NEST for e2eTesting
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // remove extraneous properties using DTO at request
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // Cookie-Session added to app.module instead of main.ts AS RECOMENDED by NEST for e2eTesting
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')], // Don't change the KEY whose value is being extracted from .env file, cookie session will fail
        }),
      )
      .forRoutes('*'); // Applied for all routes
  }
}
