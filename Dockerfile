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

# Production env
FROM node:10-alpine
MAINTAINER Abakus Webkom <webkom@abakus.no>
RUN mkdir /app
WORKDIR /app/

ARG RELEASE
ENV RELEASE ${RELEASE}

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/static static
RUN yarn --prod
COPY --from=builder /app/.next .next

ENTRYPOINT ["yarn", "start"]
