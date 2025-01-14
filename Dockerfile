FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

ENV PORT 3000

CMD ["serve", "-s", "build", "-l", "3000"]

