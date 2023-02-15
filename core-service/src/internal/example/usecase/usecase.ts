import { randomInt } from 'crypto'
import { cpSync } from 'fs'
import { connect, ConnectionOptions, Empty, StringCodec } from 'nats'
import winston from 'winston'
import { Config } from '../../../config/config.interface'
import Nats from '../../../external/nats'

class Usecase {
    constructor(
        private config: Config,
        private logger: winston.Logger,
        private nats: Nats
    ) {}

    public async RequestIsOddOrEven() {
        try {
            const sc = StringCodec()

            const number = randomInt(10)
            const data = JSON.stringify({
                number,
            })

            const subject = 'is.odd.or.even'
            const response = await this.nats.request(subject, sc.encode(data))

            const replyData = JSON.parse(sc.decode(response.data))

            console.log(
                `Request Is ${number} even or odd : ${replyData.isOddOrEven}`
            )
        } catch (error: any) {
            this.logger.error(error.message)
        }
    }

    public async PublishDoingThingsStepOne() {
        try {
            const sc = StringCodec()

            const data = JSON.stringify({
                message: 'Doing Things Step One',
            })

            const subject = 'doing.things.step.one'
            await this.nats.publish(subject, sc.encode(data))

            console.log(`Published to subject ${subject}`)
        } catch (error: any) {
            this.logger.error(error.message)
        }
    }

    public async SubscribeDoingThingsStepTwo() {
        try {
            const sc = StringCodec()

            const subject = 'doing.things.step.two'
            const subscribe = await this.nats.subscribe(subject)

            ;(async () => {
                console.log(`listening for ${subject} requests...`)

                for await (const m of subscribe) {
                    console.log(
                        `[${subscribe.getProcessed()}]: ${sc.decode(m.data)}`
                    )
                }

                console.log('subscription closed')
            })()
        } catch (error: any) {
            this.logger.error(error.message)
        }
    }
}

export default Usecase
