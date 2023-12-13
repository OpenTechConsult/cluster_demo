FROM node:21-slim

WORKDIR /app

COPY package*.json .

RUN npm install -g loadtest pm2

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "run", "dev"]