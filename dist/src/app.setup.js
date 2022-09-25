"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGlobalPipes = exports.setupCookieSession = exports.setupSwaggerDoc = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const path = require("path");
const cookieSession = require('cookie-session');
function setupSwaggerDoc(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Car Value App')
        .setDescription('Swagger Documentation for car value app made with NestJS')
        .setVersion('1.0.0')
        .addServer('http://localhost:3000/')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    fs.writeFileSync(path.resolve('./src/swagger-spec.json'), JSON.stringify(document));
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.setupSwaggerDoc = setupSwaggerDoc;
function setupCookieSession(app) {
    app.use(cookieSession({
        keys: ['COOKIE_STRING'],
    }));
}
exports.setupCookieSession = setupCookieSession;
function setupGlobalPipes(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
}
exports.setupGlobalPipes = setupGlobalPipes;
//# sourceMappingURL=app.setup.js.map