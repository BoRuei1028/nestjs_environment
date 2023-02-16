#### Prebuild ####

FROM node:18-alpine As prebuild

USER node

WORKDIR /usr/src

# COPY . /usr/src/
COPY --chown=node:node . .

RUN npm ci --production=false

USER node

#### Build stage ####

FROM node:18-alpine As build

WORKDIR /usr/src

# COPY --chown=node:node  ./app .
# COPY package*.json /usr/src/
# COPY . /usr/src/
COPY --chown=node:node . .

COPY --chown=node:node --from=prebuild /usr/src/node_modules ./node_modules

ENV NODE_ENV staging
RUN npm run build && \
  npm ci --only=production && \
  npm cache clean --force
# RUN npm install && \
#   npm cache clean --force 


USER node

#Deploy stage

FROM node:18-alpine As deploy

RUN apk update && \
  apk add bash --no-cache bash curl && \
  rm -rf /var/cache/apk/*

# COPY --chown=node:node ./app/healthcheck /usr/local/bin/
# RUN chmod +x /usr/local/bin/healthcheck

COPY --chown=node:node --from=build /usr/src/ecosystem.config.js .
COPY --chown=node:node --from=build /usr/src/dist ./dist
COPY --chown=node:node --from=build /usr/src/node_modules ./node_modules

RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "staging" ]
#CMD [ "tail", "-f", "/dev/null" ]