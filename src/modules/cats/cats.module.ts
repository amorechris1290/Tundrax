import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

import { CatEntity } from './entities/cats.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, ConfigService, Repository],
})
export class CatsModule {}
