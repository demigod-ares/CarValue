import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(userDto: CreateUserDto): Promise<User>;
    findOne(id: number): Promise<User>;
    findByMail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User[] | "No user exist with given username.">;
    update(user: User, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
