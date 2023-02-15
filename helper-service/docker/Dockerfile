FROM --platform=linux/amd64 registry.digitalservice.id/proxyjds/library/node:14.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 registry.digitalservice.id/proxyjds/library/node:14.17.0-alpine AS server
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm cache clean --force
COPY --from=builder /app/build ./build
CMD ["npm", "run", "start"]