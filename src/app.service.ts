import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { CreateStockRecord } from './CreatedStockRecord.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './entity/fruit.entity';
import { Repository } from 'typeorm';
import { CreateFruitDto } from './CreateFruit.dto';


@Injectable()
export class AppService {
  
  private readonly redis: Redis
  constructor(

    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,

    private readonly redisService: RedisService,

    ) {
      this.redis = this.redisService.getClient()
    }
  
    async findData() {
  
    const dataFromRedis = await this.redis.get('apple')
    if(!dataFromRedis) {
      const fruit = await this.fruitRepository.findBy({
          name: 'apple'
      })
      await this.redis.set('apple', JSON.stringify(fruit), 'EX', 3)
      return `cache missing ${JSON.stringify(fruit)}`
    }
    return `cache hit ${dataFromRedis}` 

  }



  async insertFruitData(data: CreateFruitDto) {
    await this.fruitRepository.insert(data)
  }

  async updateFruitData(id, data: CreateFruitDto) {

    await this.fruitRepository.update(id, data)
  }

  async deleteFruitData(id) {

     await this.fruitRepository.delete(id)
  }


  async setTreasureValue() {
    await this.redis.set('treasure',  100)
  }
  async plusOneTreasureValue() {
    const lockCondition =  await this.redis.set('lock', 10, 'EX', 10, 'NX')
    if (!lockCondition) { //null 鎖住 => denied request
      return 'locked'
    }  //OK 沒鎖住 => set Lock => do something => release Lock
    const treasure = await this.redis.get('treasure')
    const treasureValue = Number(treasure) + 1
    await this.redis.set('treasure', `${treasureValue}`)
    await this.redis.del('lock')
    return `treasure: ${treasureValue}`
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