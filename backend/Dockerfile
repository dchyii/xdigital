FROM node:23-alpine

WORKDIR /user/src/xDigital

COPY backend/package*.json ./
RUN npm install

COPY backend .

EXPOSE 4000
CMD ["npm","run","dev"]