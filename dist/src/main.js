"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_setup_1 = require("./app.setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { abortOnError: false });
    app.set('etag', false);
    app.use((req, res, next) => {
        res.removeHeader('x-powered-by');
        res.removeHeader('date');
        next();
    });
    (0, app_setup_1.setupSwaggerDoc)(app);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map