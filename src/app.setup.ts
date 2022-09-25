// THESE FUNCTIONS CAN BE USED BY E2E-TESTING APP SETUP AS WELL, BUT NOT RECOMMENDED BY NEST
import {
  INestApplication,
  ValidationPipe
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs';
import * as path from 'path';
const cookieSession = require('cookie-session');
// import cookieSession from "cookie-session"; // Not supported

export function setupSwaggerDoc(app: INestApplication) {
// export const setupSwaggerDoc = (app: INestApplication) => { // Arrow function
const options = new DocumentBuilder()
    .setTitle('Car Value App')
    .setDescription('Swagger Documentation for car value app made with NestJS')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000/') // to use swagger docs as postman
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync(path.resolve('./src/swagger-spec.json'), JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  // Swagger doc at http://localhost:3000/api/
}

export function setupCookieSession(app: INestApplication) {
// export const setupCookieSession = (app: INestApplication) => { // Arrow function
  app.use(
    cookieSession({
      keys: ['COOKIE_STRING'], // Random string to encode and decode
    }),
  );
}

export function setupGlobalPipes(app: INestApplication) {
  // export const setupGlobalPipes = (app: INestApplication) => { // Arrow function
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extraneous properties using DTO
    })
  );
}