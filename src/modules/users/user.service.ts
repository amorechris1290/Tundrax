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
    const databaseUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (databaseUser) {
      if (databaseUser.password === user.password) {
        const payload = {
          email: databaseUser.email,
          sub: databaseUser.id,
          role: databaseUser.role,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
  }
}
