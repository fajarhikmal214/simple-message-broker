# Simple Message Broker

Simple implementation message broker with NATS

## Tech Stacks
- **TypeScript** - <https://www.typescriptlang.org/>
- **Node.js** - <https://nodejs.org/>
- **HTTP (Express default)** - <https://expressjs.com/>
- **Nats** - <https://nats.io/>

## Quick Start

1. Clone the project

```bash
$ git clone https://github.com/fajarhikmal214/simple-message-broker.git
$ cd simple-message-broker
$ cp .env.example .env
```

2. Installing Dependencies (each service)
```bash
# Install node packages
$ npm install
```

3. Copy `.env` from `.env.example` (each service)

```bash
$ cp .env.example .env
```

## How to Run

- Run with docker compose:

  ```bash
  # start
  $ docker-compose up

  # stop
  $ docker-compose down
  ```
  
  NB. If `Error: Cannot find module '/app/build/src/main.js'` , try to build (each service) with this command
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
