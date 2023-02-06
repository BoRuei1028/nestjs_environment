# 開發環境建立

### 描述
於本機端建立以 Nodejs + Nestjs 為主的後端開發環境

### 功能
* 使用 4000 port 作為後端 server port
* 於開發環境中實作 (get) helloworld API，搭配 Ngrok 可讓人遠端於網頁直接輸入上述 ngrok_url/helloworld 後顯示 hello world

### Environment 環境建置
1. Nest.js
2. Ngrok

### 安裝執行
1. 下載至本地端
```
git clone https://github.com/BoRuei1028/nestjs.environment.git
```
2. 開啟終端機，指定資料夾位置
```
cd nestjs_environment
```
3. 開啟Server
```
npm run start
```
4. 進入以下網址
https://e0b0-1-172-48-180.eu.ngrok.io/helloworld
