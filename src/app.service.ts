import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { CreateStockRecord } from './CreatedStockRecord.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AppService {
  private readonly redis: Redis
  constructor(private readonly redisService: RedisService) {
      this.redis = this.redisService.getClient()
    }
  
  async set() {
    return await this.redis.set('name', 'Andy', 'EX', 30)
  }
  async get() {
    return await this.redis.get('name')
  }
  async del() {
    return await this.redis.del('name')
  }
  
  //有給型別要有回傳值
  getHello(): string { 
    return 'Hello World!';
  }

  getDataById(id: string) {
    return [
      {
        'id': `${id}`
      }
    ]
  }

  createstockrecord(data: CreateStockRecord) {
    const { weight } = { ...data }
    return { weight }
  }

}