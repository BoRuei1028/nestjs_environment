# 使用 pm2 啟動 Node.js cluster

### 描述
透過pm2來啟動開發環境cluster

### 功能
* 使用 pm2 啟動 4 個 application process instances, 每個 cluster 分配 1G 的 RAM
* 透過 pm2 設定不同環境下的 environment variable(development/staging/production)
* 能根據不同執行環境產出不同log

### Environment 環境建置
1. Nest.js
2. PM2

### 安裝執行
1. 下載至本地端
```
git clone https://github.com/BoRuei1028/nestjs.environment.git
```
2. 開啟終端機，指定資料夾位置
```
cd nestjs_environment
```
3. 安裝PM2
```
npm install pm2 -g
```
4. 執行環境設定檔
```
PM2 start ecosystem.config.js
```
