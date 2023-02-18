
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis'

@Module({
  imports: [
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

