FROM node:15

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 8000

CMD node /app/dist/bundle.js
