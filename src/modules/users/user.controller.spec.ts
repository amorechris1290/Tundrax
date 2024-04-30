import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result: UserEntity = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
        role: 'user',
      };
      const createUserDto: CreateUserDto = {
        name: 'test',
        password: 'test',
        email: 'test@gmail.com',
        role: 'user',
      };
      jest
        .spyOn(userService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await usersController.create(createUserDto)).toBe(result);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const result = { access_token: 'test_token' };
      const loginUserDto: LoginUserDto = {
        email: 'test@gmail.com',
        password: 'test',
      };
      jest
        .spyOn(userService, 'login')
        .mockImplementation(() => Promise.resolve(result));

      expect(await usersController.login(loginUserDto)).toBe(result);
    });
  });
});
