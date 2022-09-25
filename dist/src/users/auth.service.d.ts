import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signup(userDto: CreateUserDto): Promise<import("./user.entity").User>;
    validateUpdate(id: number, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    private generateHash;
    signin(email: string, password: string): Promise<import("./user.entity").User>;
}
