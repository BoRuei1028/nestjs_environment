# 使用 SQL server 與 Redis server 建立資料快取機制

[描述]
將 redis 當成 sql 的資料快取，將從 sql 取出的資料先暫存在 redis 中以避免 sql 被頻繁查詢

[驗收方式]
1. 查詢某筆資料，若資料不存在 redis 中時，顯示 cache missing。反之則顯示 cache hit。
2. 上述兩種狀況發生時都需回傳該筆資料的結果。
3. 對該資料編輯並儲存，並再次查詢時需回傳編輯後的情況。
4. 五秒內(第一秒＆第四秒)連續查詢相同資料時，都需回傳 cache hit。

[附註]
1. redis 中的每筆資料預設 3 秒後過期消失

---

條件: 資料是否在redis中，以get作為判斷
如果存在，那直接回傳get結果
如果不存在，到sql取資料，set進redis

```typescript!
 async findData() {
  
    const dataFromRedis = await this.redis.get('apple')
    if(!dataFromRedis) {
      const fruit = await this.fruitRepository.findBy({
          name: 'apple'
      })
      await this.redis.set('apple', JSON.stringify(fruit), 'EX', 3)
    /*
    return `cache missing ${[...fruit]}`
    => [object, Object]
    */
      return `cache missing ${JSON.stringify(fruit)}`
    }
    return `cache hit ${dataFromRedis}`

  }
```


#### 問題: [object Object]

![](https://i.imgur.com/gqh2QsW.png)

> (ChatGPT)這個錯誤通常表示程式碼中使用了 JavaScript 的 toString() 方法或者類似的方法將一個物件轉換為字串，但是該方法沒有按照預期工作，返回了 [object Object] 這樣的字串，而不是期望的物件內容的字串表示形式。如果你確定使用了 toString() 方法或者類似的方法，你可以使用 JSON.stringify() 方法將物件轉換為 JSON 字串表示形式
>> 我該如何獲得findBy()回傳的fruit?

```
//return fruit 結果
[
    {
        "id": 2,
        "name": "apple",
        "price": 35
    }
]
//外面會有[] 裝findby()的結果(可能不只一筆)
```

自己推測是跟fruit變數的型別fruit[]有關，因為當我直接寫`this.redis.set('apple', fruit)`是會報錯的。提示訊息為類型 'Fruit[]' 的引數不可指派給類型 'string | number | Buffer' 的參數。所以就需要如ChatGPT回覆中所述，**使用 JSON.stringify() 方法將物件轉換為 JSON 字串表示形式**，做return時也需要經過這個步驟。
