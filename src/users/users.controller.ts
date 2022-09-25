import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
// Interceptor applied at controller level
@Serialize(UserDto) // Global interceptor for DTOs to exclude extraneous values on response
// @UseInterceptors(ClassSerializerInterceptor) // Applying Serialization on DTO is always better than applying it on entity.
// @UseInterceptors(CurrentUserInterceptor) // Shifted to be globally scoped level (UsersModule). Used before CurrentUserDecorator.
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/user')
  @UseGuards(AuthGuard) // Guard at route level. Forbidden resource without Login.
  whoAmI(@CurrentUser() user: User) { // Custom decorator for CurrentUser
    console.log('Inside whoAmI() method of UsersController.');
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    console.log('Inside signOut() method of UsersController.');
    if (!session.userId) {
      throw new NotFoundException('Kindly signIn first!');
    }
    session.userId = null;
    return 'You have successfully Signed Out!';
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('Inside createUser() method of UsersController.');
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: Partial<CreateUserDto>, @Session() session: any) {
    console.log('Inside signIn() method of UsersController.');
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: number) {
    console.log('Inside findUser() method of UsersController.');
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findByMail(@Query('email') email: string) {
    console.log(`Inside findByMail(${email}) method of UsersController.`);
    return this.usersService.findByMail(email);
  }

  @Get('/user/users') // checks find() method of TypeORM Repository
  findByUsername(@Query('user') username: string) {
    console.log(`Inside findByUsername(${username}) method of UsersController.`);
    return this.usersService.findByUsername(username);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    console.log('Inside removeUser() method of UsersController.');
    return this.usersService.remove(id);
  }

  @Patch('/:id') // PUT is used when we modify entire resource
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    console.log('Inside updateUser() method of UsersController.');
    return this.authService.validateUpdate(id, body);
  }
}
