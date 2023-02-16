
#區分階段安裝該階段需要的東西

#### Prebuild ####

FROM node:18-alpine As prebuild

USER node

WORKDIR /usr/src

# 這個階段需安裝node所需要的套件
# 寫COPY --chown=node:node . . 需確保進入images 是乾淨的
# --chown=node:node 與Linux最高權限有關 => 只有user = node 時才能執行
COPY --chown=node:node ./package*.json .


RUN npm ci --production=false

USER node

#### Build stage ####

FROM node:18-alpine As build

WORKDIR /usr/src

# 這個階段只需安裝production所需要的 => dependencies

# COPY --chown=node:node ./package*.json . => Error
# Could not find TypeScript configuration file "tsconfig.json" => 只給package*.json就找不到tsconfig.json
COPY --chown=node:node ./ .
COPY --chown=node:node --from=prebuild /usr/src/node_modules ./node_modules

ENV NODE_ENV staging
RUN npm run build && \
  npm ci --only=production && \
  npm cache clean --force


USER node

#Deploy stage

FROM node:18-alpine As deploy

# 這裡的工作目錄與prebuild/build不同
WORKDIR /code

RUN apk update && \
  apk add bash --no-cache bash curl && \
  rm -rf /var/cache/apk/*

# COPY [--chown=<user>:<group>] <src>... <dest>
COPY --chown=node:node ./healthcheck /usr/local/bin/
RUN chmod +x /usr/local/bin/healthcheck
# 轉成可執行檔

COPY --chown=node:node --from=build /usr/src/ecosystem.config.js .
COPY --chown=node:node --from=build /usr/src/dist ./dist
COPY --chown=node:node --from=build /usr/src/node_modules ./node_modules

RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "staging" ]
#CMD [ "tail", "-f", "/dev/null" ]