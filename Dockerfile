FROM node:23-alpine

WORKDIR /user/src/xDigital

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm","run","dev"]