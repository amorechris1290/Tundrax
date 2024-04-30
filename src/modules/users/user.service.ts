import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }
  async login(user: LoginUserDto) {
    const IsUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (IsUser) {
      if (IsUser.password === user.password) {
        const payload = {
          email: user.email,
          sub: IsUser.id,
          role: IsUser.role,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
  }
}
