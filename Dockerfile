# Build env
FROM node:10 as builder
MAINTAINER Abakus Webkom <webkom@abakus.no>

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn --ignore-scripts --silent

ARG RELEASE
ENV NODE_ENV production
ENV RELEASE ${RELEASE}

COPY . /app
RUN yarn build
RUN yarn export

# Production env
FROM nginx:1.14.2-alpine
MAINTAINER Abakus Webkom <webkom@abakus.no>

COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

