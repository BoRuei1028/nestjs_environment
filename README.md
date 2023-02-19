# 架設 Redis server

### 描述
於本機端透過 docker 架設 Redis server

### 功能
* 於開發環境中實作可對 Redis server 進行 SET/GET/DELETE key 功能的 API
* 需對 Redis server 進行帳號密碼設定
* 透過 docker 部署驗收環境

### Environment 環境建置
1. Nest.js
2. Ngrok
3. swagger
4. docker 
5. redis
6. pm2

### 安裝執行
1. 下載至本地端
```
git clone https://github.com/BoRuei1028/nestjs.environment.git
```
2. 開啟終端機，指定資料夾位置
```
cd nestjs_environment
```
3. 建立images
```
docker build -t nest-pm2-docker .
```
4. 啟動開發環境(包含nestjs-pm2-docker 和 redis 兩個容器)
```
docker compose up -d
```

