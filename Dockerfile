FROM node:16-alpine AS build

RUN apk add --no-cache build-base g++ gcc make libpng libpng-dev jpeg-dev pango-dev cairo-dev python3;

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn
RUN yarn build

FROM nginx
COPY --from=build /app/nginx.conf /etc/nginx/default.conf
COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 30999

CMD ["nginx"]