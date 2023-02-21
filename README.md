# 開發環境搭配 Redis 建立互斥鎖的存取機制

[描述]
透過 Redis SET NX 來建立互斥鎖，以避免資料的 race condition

[驗收方式]
1. 於 Redis 中先建立 ```{"treasure": 100}```。
2. 寫一隻可用來改變 treasure 的 api (假設行為是 value += 1)
3. 連續呼叫 api
4. treasure 在十秒內只能被改變一次

#### 關於redis sentx 指令
```!
const lockCondition =  await this.redis.set('lock', 'true', 'EX', 10, 'NX')
```
* key命名為lock，值為隨機值 
* EX 設key的時效/單位為秒
* NX: `SET if Not eXists` 命令在指定的 key 不存在时，為 key 设置指定的值。
* lockCondition 的值有兩種: 'OK' or 'null'
