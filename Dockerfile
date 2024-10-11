# TODO Start: [Student] Complete Dockerfile
# Stage 0
FROM node:18 AS build

ENV FRONTEND=/opt/app

WORKDIR $FRONTEND

RUN yarn config set registry https://registry.npmmirror.com

COPY . .

RUN yarn install

RUN yarn build && yarn export

# Stage 1
FROM nginx:1.22

ENV HOME=/opt/app

WORKDIR $HOME

COPY --from=build /opt/app/out dist

COPY nginx /etc/nginx/conf.d

EXPOSE 80
# TODO End