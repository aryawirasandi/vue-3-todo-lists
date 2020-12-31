# for development build
FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install


COPY ./ .

ENV PORT=8080

EXPOSE 8080

CMD [ "yarn", "serve" ];

# for production build

# RUN yarn run build

# FROM nginx as production-stage

# RUN mkdir /app

# COPY --from=build-stage /app/dist /app

# COPY nginx.conf /etc/nginx/nginx.conf


# development setup