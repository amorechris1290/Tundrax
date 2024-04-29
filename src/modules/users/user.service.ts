import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class UserService {x
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}
  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
     
  }
  async login(user: LoginUserDto) {
    const IsUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (IsUser) {
      if (IsUser.password === user.password) {
        const payload = { email: user.email, sub: IsUser.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
  }

}
