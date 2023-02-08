import { Injectable } from '@nestjs/common';
import { CreateStockRecord } from './CreatedStockRecord.dto';

@Injectable()
export class AppService {
  
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
