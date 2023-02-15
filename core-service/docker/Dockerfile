FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/build ./build
CMD ["npm", "run", "start"]