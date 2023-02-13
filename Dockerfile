# 建立開發環境步驟

# FROM node:18 ; node:18-alpine 輕量
FROM node:18-alpine

#src路徑 /nestjs_environment/src
WORKDIR /nestjs_environment 

# COPY (1)要複製的檔案 (2)路徑(./ => WORKDIR)
COPY package*.json ./


RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/main.js"]

