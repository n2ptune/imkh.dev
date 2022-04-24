FROM node:16-alpine AS build

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn build

FROM nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 30999

CMD ["nginx"]