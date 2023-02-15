import winston from 'winston'
import { connect, ConnectionOptions, NatsConnection } from 'nats'
import { Config } from '../config/config.interface'

class Nats {
    public client: NatsConnection | undefined

    constructor(private logger: winston.Logger, { nats }: Config) {
        const server: ConnectionOptions = {
            servers: nats.url,
            token: 'my-tokens',
        }

        this.setup(server)
    }

    private async setup(server: ConnectionOptions) {
        this.client = await connect(server)
        this.logger.info(`Nats Client Connected to ${this.client.getServer()}`)
    }
}

export default Nats
