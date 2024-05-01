import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './user.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, ConfigService, Repository],
})
export class UserModule {}
