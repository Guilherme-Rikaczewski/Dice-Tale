# ---------- Base ----------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ARG DATABASE_URL
ARG REDIS_URL
ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL

EXPOSE 3000

CMD ["npm", "start"]
