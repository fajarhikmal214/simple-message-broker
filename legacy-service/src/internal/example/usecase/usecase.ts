import { randomInt } from 'crypto'
import { StringCodec } from 'nats'
import winston from 'winston'
import { Config } from '../../../config/config.interface'
import Nats from '../../../external/nats'

class Usecase {
    constructor(
        private config: Config,
        private logger: winston.Logger,
        private nats: Nats
    ) {
        this.Test()
        console.log('HAI')
    }

    public async Test() {
        // create a codec
        const sc = StringCodec()

        const subscription = this.nats.client?.subscribe('is.odd.or.even')

        ;async (sub: any) => {
            const subject = sub.getSubject()
            console.log(`listening for ${subject} requests...`)

            for await (const m of sub) {
                const randomNumber = randomInt(10)
                const isOddOrEven = await this.isOddOrEven(randomNumber)

                const reply = m.respond(isOddOrEven)

                if (reply) {
                    console.info(`[${subject}] handled #${sub.getProcessed()}`)
                } else {
                    console.log(
                        `[${subject}] #${sub.getProcessed()} ignored - no reply subject`
                    )
                }
            }

            console.log(`subscription ${subject} drained.`)
        }
        subscription
    }

    public async isOddOrEven(number: number): Promise<boolean> {
        return number % 2 == 0
    }
}

export default Usecase
