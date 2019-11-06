FROM hub.mfwdev.com/paas/node:8.12.0-stretch
# RUN apk update && apk add bash && rm -rf /var/cache/apk/*


WORKDIR /animaris
COPY package.json /animaris/package.json
RUN npm i  --registry=https://registry.npm.taobao.org

COPY src /animaris/src
COPY view /animaris/view
COPY www /animaris/www
# COPY runtime /animaris/runtime
COPY production.js /animaris/production.js
COPY development.js /animaris/development.js

ENV DOCKER=true
EXPOSE 8360
CMD [ "node", "/animaris/development.js" ]