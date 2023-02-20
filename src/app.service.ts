import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { CreateStockRecord } from './CreatedStockRecord.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';


let treasure = 100

@Injectable()
export class AppService {
  
  private readonly redis: Redis
  constructor(private readonly redisService: RedisService) {
      this.redis = this.redisService.getClient()
    }

  async setTreasureValue() {
    await this.redis.set('treasure', `${treasure}`, 'EX', 10, 'NX')
  }

  async getTreasureValue() {
    const value = await this.redis.get('treasure')
     return `treasure: ${value}`
  }

  async plusOneTreasureValue() {
    const lockCondition =  await this.redis.set('lock', 'true', 'EX', 10, 'NX')
    if (!lockCondition) { //null 鎖住 => denied request
      return `treasure: ${treasure} locked` 
    
    } else { //OK 沒鎖住 => set Lock => do something => release Lock
        let treasure = await this.redis.get('treasure')
        const treasureValue = Number(treasure) + 1
        await this.redis.set('treasure', `${treasureValue}`)
        await this.redis.del('lock')
        return `treasure: ${treasureValue} unlocked`
    }
  }

  /*
  不是去判斷treasure是否被鎖住，treasure也不需要設定鎖和時效
  */

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