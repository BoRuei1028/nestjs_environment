# 透過 docker 部署開發環境

### 描述
本機安裝docker與docker-compose，並將開發環境透過docker部署

### 實作
* 撰寫 dockerfile
* 使用 docker-compose 啟動開發環境

### Environment 環境建置
1. Nest.js
2. swagger
3. pm2
4. docker

### 安裝執行
1. 下載至本地端
```
git clone https://github.com/BoRuei1028/nestjs_environment.git
```
2. 開啟終端機，指定資料夾位置
```
cd nestjs_environment
```
3. 使用Dockerfile建立images
```
docker build -t nest-pm2-docker
```
4. 使用docker-compose.yml 啟動開發環境container
```
docker compose up -d
```
5. 移除該container
```
docker compose down
