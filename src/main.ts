import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  setupSwaggerDoc,
  // setupCookieSession,
  // setupGlobalPipes
} from './app.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
                                      {abortOnError: false }
  // By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error, disable abortOnError
                                      );
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  // ADD if not added in app.module.ts. Not RECOMMENDED by NEST
  setupSwaggerDoc(app);
  // setupCookieSession(app);
  // setupGlobalPipes(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
