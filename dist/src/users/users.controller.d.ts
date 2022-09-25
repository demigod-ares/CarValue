import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    whoAmI(user: User): User;
    signOut(session: any): string;
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signIn(body: Partial<CreateUserDto>, session: any): Promise<User>;
    findUser(id: number): Promise<User>;
    findByMail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User[] | "No user exist with given username.">;
    removeUser(id: number): Promise<User>;
    updateUser(id: number, body: UpdateUserDto): Promise<User>;
}
