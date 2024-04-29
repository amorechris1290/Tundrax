import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatEntity } from "./entities/cats.entity";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService, ConfigService, Repository],
})
export class CatsModule {}
