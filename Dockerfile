FROM node:15.14.0-buster-slim
EXPOSE 3000
WORKDIR /app
COPY . .
CMD cd /app && yarn run start:prod
