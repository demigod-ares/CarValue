"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    },
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            migrationsRun: true,
            entities: ['**/*.entity.ts'],
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            database: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.ts'],
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    default:
        throw new Error('unknown environment');
}
exports.default = dbConfig;
//# sourceMappingURL=ormconfig.js.map