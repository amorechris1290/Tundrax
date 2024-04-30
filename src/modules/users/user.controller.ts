import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return await this.userService.login(user);
  }
}
