# Simple Message Broker

Simple implementation message broker with NATS

![Simple Message Broker](https://user-images.githubusercontent.com/79292118/219108114-473f76aa-371f-4770-90b8-b2eeec5214c0.png)

## Tech Stacks
- **TypeScript** - <https://www.typescriptlang.org/>
- **Node.js** - <https://nodejs.org/>
- **HTTP (Express default)** - <https://expressjs.com/>
- **Nats** - <https://nats.io/>

## Quick Start

0. Create NATS Instance with docker
```bash
docker run --name nats --network nats --rm -d -p 4222:4222 nats -js
```

1. Clone the project

```bash
$ git clone https://github.com/fajarhikmal214/simple-message-broker.git
$ cd simple-message-broker
```

2. Installing Dependencies (each service, meaning it is necessary to change directory to each service (e.g. `cd core-sevice`)
```bash
# Install node packages
$ npm install
```

3. Copy `.env` from `.env.example` (each service, meaning it is necessary to change directory to each service (e.g. `cd core-sevice`)

```bash
$ cp .env.example .env
```

## How to Run

- Run locally (each service, meaning it is necessary to change directory to each service (e.g. `cd core-sevice`)

  ```bash
  $ npm run start:dev
  ```

- Run with docker compose:

  ```bash
  # start
  $ docker-compose up

  # stop
  $ docker-compose down
  ```
  
  NB. If `Error: Cannot find module '/app/build/src/main.js'` error occurs, try to build (each service) with this command
  ```bash
  $ cd core-service && npm run build
  $ cd helper-service && npm run build
  $ cd legacy-service && npm run build
  ```

## Repo Structure

```
├── core-service/
  ├── docker/    * Dockerfile
  ├── src/
    └── config/      * app configuration
    └── external/    * external service
    └── helpers/     * extra helper functions that might commonly be used by other modules
    └── intenal/     * where all the magics happen
      └── <module-name>/
    └── pkg/         * extra packages like language, logger, status code, etc.
    └── transport/
      └── http/
    └── main.ts
  └── ...
├── docker-compose.yml
└── ...
```

## Boilerplate
https://github.com/ayocodingit/clean-architecture-ts
