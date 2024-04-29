import { Body, Controller, Get, Param, Post,Put,Delete, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

import { User } from './interfaces/user.interface';

import { UserEntity } from './entities/user.entity';



@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  // @Roles(['admin'])
  async create(@Body() user: CreateUserDto): Promise<UserEntity>{
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto){
    return await this.userService.login(user);
  }

}
