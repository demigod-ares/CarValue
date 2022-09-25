import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  let fakeCreateUser: CreateUserDto = {
    email: "random10@mail.com",
    password : "pass10",
    username : "demigod10",
    admin : false
  }

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      findByMail: (email: string) => {
        const filteredUsers = users.find((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (fakeUserDto: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          ...fakeUserDto
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup(fakeCreateUser);

    expect(user.password).not.toEqual(fakeCreateUser.password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup(fakeCreateUser);
    expect(async() => await service.signup(fakeCreateUser)).rejects.toThrow();
  });

  it('throws if signin is called with an unused email', async () => {
    expect(async() => await service.signin('asdflkj@asdlfkj.com', 'passdflkj')).rejects.toThrow();
  });

  it('throws if an invalid password is provided', async (done) => {
    await service.signup(fakeCreateUser);
    expect(async() => await service.signin(fakeCreateUser.email, 'incorrect password')).rejects.toThrow();
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup(fakeCreateUser);
    const user = await service.signin(fakeCreateUser.email, fakeCreateUser.password);
    expect(user).toBeDefined();
    expect(user.email).toEqual(fakeCreateUser.email);
  });
});
