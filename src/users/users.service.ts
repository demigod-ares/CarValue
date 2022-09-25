import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(userDto: CreateUserDto) {
    console.log('Inside create() method of UsersService.');
    const user = this.repo.create(userDto);
    // creating entity is important for hooks to work
    return this.repo.save(user);
  }

  findOne(id: number) {
    console.log('Inside findOne() method of UsersService.');
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({id});
  }

  findByMail(email: string) {
    console.log('Inside findByMail() method of UsersService.');
    return this.repo.findOneBy({ email });
  }

  async findByUsername(username: string) {
    console.log('Inside findByUsername() method of UsersService.');
    const user = await this.repo.find({ where: { username }});
    if (user.length) return user;
    return 'No user exist with given username.';
  }

  async update(user: User, attrs: Partial<User>) {
    console.log('Inside update() method of UsersService.');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    console.log('Inside remove() method of UsersService.');
    const user = await this.findOne(id);
    // creating entity is important for hooks to work
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
