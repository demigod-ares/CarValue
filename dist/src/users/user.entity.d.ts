import { Report } from '../reports/report.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    username: string;
    reports: Report[];
    logInsert(): void;
    logUpdate(): void;
    logBeforeRemove(): void;
    logAfterRemove(): void;
}
