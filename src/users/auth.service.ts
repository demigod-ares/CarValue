import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(userDto: CreateUserDto) {
    console.log('Inside signup() method of AuthService.');
    // See if email is in use
    if (await this.usersService.findByMail(userDto.email)) { // No hooks related to find()
      throw new BadRequestException('email in use');
    }
    userDto.password = await this.generateHash(userDto.password);
    // Create a new user (for HOOKS to work) and save it
    const user = await this.usersService.create(userDto);
    // return the user
    return user;
  }

  async validateUpdate(id: number, dto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);
    // creating entity is important for HOOKS to work
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (dto.email && await this.usersService.findByMail(dto.email)) {
      throw new BadRequestException('email in use');
    }
    if (dto.password) {
      dto.password = await this.generateHash(dto.password);
    }
    return this.usersService.update(user, dto);
  }

  private async generateHash(password: string) {
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    return salt + '.' + hash.toString('hex');
  }

  async signin(email: string, password: string) {
    console.log('Inside signin() method of AuthService.');
    // Get User entity from database
    const user = await this.usersService.findByMail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // get salt and storedHash in user entity
    const [salt, storedHash] = user.password.split('.');
    // generate hash with input password and salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // compare generated hash with stored hash
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    // return the user
    return user;
  }
}
