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
    const lockCondition =  await this.redis.set('treasure', `${treasure}`, 'EX', 10, 'NX')
    const isLockKeyExisted = await this.redis.setnx('lock', 'true') 

    //如果回1 => 設置成功 <= key不存在
    //如果回0 => 設定失敗 <= key存在

      //鎖住 => denied request
    if (!lockCondition) {
      return `treasure: ${treasure} locked(by treasure)` 

     // return `islockCondition: ${lockCondition}` //null
     //沒鎖住 => set Lock => do something => release Lock
    } else {
      // const isLockKeyExisted = await this.redis.setnx('lock', 'true') 
        if (!isLockKeyExisted) { //isLockKeyExisted = 0 lockKey存在
          treasure += 1 
          this.redis.del('lock')
          return `treasure: ${treasure} unlocked`
        }

        return `treasure: ${treasure} locked(by lockKey)`

      //沒鎖住 => set Lock => do something => release Lock
      //del lock => release lock => request
      // return `treasure: ${treasure} unlocked`
      // return `lockCondition: ${lockCondition}` //OK

    }
  }

  // async delTreasureValue() {
  //   await this.redis.del('treasure')
  //   treasure = 100
  //   return 'deleted'
  // }

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