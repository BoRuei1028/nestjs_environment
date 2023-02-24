
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Fruit } from './entity/fruit.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Fruit]),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb', 
      port: 3306,
      username: 'root', 
      password: '123456789',
      database: 'testdb', //資料表建在testdb
      entities: [Fruit],
      synchronize: true
      }),
    RedisModule.forRootAsync({ 
        //斜線後redis => docker.compose.yml 設定的redis container_name
        useFactory: () =>({
          config: { 
          url: 'redis://redis:6379',
          password: 'mypassword'
          }
        }),
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

