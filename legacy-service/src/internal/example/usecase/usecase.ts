import { randomInt } from 'crypto'
import {
    connect,
    ConnectionOptions,
    StringCodec,
    Subscription,
    SubscriptionOptions,
} from 'nats'
import { timeout } from 'nats/lib/nats-base-client/util'
import winston from 'winston'
import { Config } from '../../../config/config.interface'
import Nats from '../../../external/nats'

class Usecase {
    constructor(
        private config: Config,
        private logger: winston.Logger,
        private nats: Nats
    ) {}

    public async ReplyIsOddOrEven() {
        const server: ConnectionOptions = {
            servers: this.config.nats.url,
        }

        const natsConnection = await connect(server)

        const queue = 'my-queue'
        const subscriptionOptions: SubscriptionOptions = {
            queue,
        }

        const sc = StringCodec()

        const subject = 'is.odd.or.even'
        const subscription = natsConnection.subscribe(
            subject,
            subscriptionOptions
        )

        ;(async (sub: any) => {
            console.log(`listening for ${subject} requests...`)

            for await (const m of sub) {
                const data = JSON.parse(m.data)
                const isOddOrEven = await this.isOddOrEven(data.number)

                const req = JSON.stringify({
                    isOddOrEven,
                })

                const respond = await m.respond(sc.encode(req))

                if (respond) {
                    console.info(`[${subject}] handled #${sub.getProcessed()}`)
                } else {
                    console.log(
                        `[${subject}] #${sub.getProcessed()} ignored - no reply subject`
                    )
                }
            }

            console.log(`subscription ${subject} drained.`)
        })(subscription)
    }

    public async isOddOrEven(number: number): Promise<string> {
        if (number % 2 == 0) {
            return 'even'
        }

        return 'odd'
    }
}

export default Usecase
