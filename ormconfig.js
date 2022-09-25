var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development': // dev environment reads TS files compiled in JS files only
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test': // Needs TS file, in tsconfig.json provide allowJS to use JS in testing environment
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      migrationsRun: true,
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production': // Database deployed on Heroku
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

export default dbConfig;
