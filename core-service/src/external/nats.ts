import winston from 'winston'
import {
    connect,
    ConnectionOptions,
    Msg,
    NatsConnection,
    PublishOptions,
    RequestOptions,
    Subscription,
    SubscriptionOptions,
} from 'nats'
import { Config } from '../config/config.interface'

class Nats {
    private client!: NatsConnection

    constructor(private logger: winston.Logger, { nats }: Config) {
        const server: ConnectionOptions = {
            servers: nats.url,
        }

        this.setup(server)
    }

    private async setup(server: ConnectionOptions) {
        this.client = await connect(server)
        this.logger.info(`Nats Client Connected to ${this.client.getServer()}`)
    }

    public async request(
        subject: string,
        data?: Uint8Array | undefined,
        options?: RequestOptions | undefined
    ): Promise<Msg> {
        return this.client.request(subject, data, options)
    }

    public async publish(
        subject: string,
        data?: Uint8Array | undefined,
        options?: PublishOptions | undefined
    ) {
        return this.client.publish(subject, data, options)
    }

    public async subscribe(
        subject: string,
        options?: SubscriptionOptions | undefined
    ): Promise<Subscription> {
        return this.client.subscribe(subject, options)
    }
}

export default Nats
