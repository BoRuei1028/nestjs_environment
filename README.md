# 使用 TypeORM 操作 SQL server

[實作功能]
於開發環境中使用 TypeORM 對 Mariadb SQL server 進行操作

[驗收方式]
1. 可用 TypeORM 對 Mariadb SQL server 進行連線
2.使用 TypeORM 建立 SQL 資料表(table name: fruit_price, column: id, name, price)
3. 於開發環境中實作可對 fruit_price 資料表進行 insert/update/delete 的 API
4. 透過 docker-compose 部署驗收環境

---
### 安裝套件
npm install --save @nestjs/typeorm typeorm mysql2

### 使用 TypeORM 建立 SQL 資料表(table name: fruit_price, column: id, name, price)
參考[nestjs-database](https://docs.nestjs.com/techniques/database)

定義資料表
```
//fruit.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fruit_price')
export class Fruit {
  @PrimaryGeneratedColumn() //主鍵
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

}
```
![](https://i.imgur.com/x2VEn7D.png)
### 可用 TypeORM 對 Mariadb SQL server 進行連線
host: 'localhost' => Error
![](https://i.imgur.com/80mc94E.png)

#### 可行
```
//app.module.ts
TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb', <= 給container_name
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'testdb', 
      entities: [Fruit],
      synchronize: true
      }),
//docker compose yml
mariadb:
    image: mariadb
    container_name: "mariadb"
    hostname: mariadb
    ports:
      - target: 3306
        published: 3306
        protocol: tcp
    env_file:
      - mariadb.env
    volumes:
      - ./db/data:/var/lib/mysql
      - ./db/initdb.d:/docker-entrypoint-initdb.d
    networks:
      - myNetWork <= 加入
```

### 於開發環境中實作可對 fruit_price 資料表進行 insert/update/delete 的 API
參考[repository-api](https://orkhan.gitbook.io/typeorm/docs/repository-api)
#### insert
程式碼
```typescript
//app.controller.ts
@Post('api/fruitData')
  insertFruitData(@Body() data: CreateFruitDto )  {
    this.appService.insertFruitData(data)
    return {...data}
  } 
//app.service.ts
 async insertFruitData(data: CreateFruitDto) {
    await this.fruitRepository.insert(data)
  }
```
![](https://i.imgur.com/3y6An8K.png)

新增成功
![](https://i.imgur.com/bwqeCcU.png)


#### update
```
//範例
await repository.update({ age: 18 }, { category: "ADULT" })
// executes UPDATE user SET category = ADULT WHERE age = 18

await repository.update(1, { firstName: "Rizzrak" })
// executes UPDATE user SET firstName = Rizzrak WHERE id = 1
```
接兩個引數(變更條件, 變更內容)

程式碼
```typescript!
//app.controller.ts
@Put('api/fruitData/:id')
  updateFruitData(@Param('id') id, @Body() createFruitDto : CreateFruitDto) {
    return this.appService.updateFruitData(id, createFruitDto)
  }
//app.service.ts
async updateFruitData(id, data: CreateFruitDto) {
    await this.fruitRepository.update(id, data)
  }
  
//CreatedFruit.dto.ts
export class CreateFruitDto {
   
   name: string;

   price: number;

}
```

目前資料表中的三筆資料
![](https://i.imgur.com/0hA0MAn.png)
指定變更id: 3 的資料
![](https://i.imgur.com/TUmA8Nj.png)
成功變更
![](https://i.imgur.com/7Lqw5Ii.png)



#### delete
使用Delete 指定刪除id: 3資料
程式碼
```typescript!
//app.controller.ts
@Delete('api/fruitData/:id')
  deleteFruitData(@Param('id') id) {
    return this.appService.deleteFruitData(id)
  }


//app.service.ts
 async deleteFruitData(id) {
     await this.fruitRepository.delete(id)
  }
```
![](https://i.imgur.com/MFqg5tv.png)
成功刪除
![](https://i.imgur.com/WARkApC.png)



