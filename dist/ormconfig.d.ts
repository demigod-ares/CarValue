export default dbConfig;
declare namespace dbConfig {
    const synchronize: boolean;
    const migrations: string[];
    namespace cli {
        const migrationsDir: string;
    }
}
