import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './modules/cats/cats.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/users/user.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import config from './database/config';

@Module({
  imports: [
    CoreModule,
    CatsModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, config],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
