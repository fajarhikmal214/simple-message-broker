import { connect, ConnectionOptions, StringCodec } from 'nats'
import winston from 'winston'
import { Config } from '../../../config/config.interface'

class Usecase {
    constructor(private config: Config, private logger: winston.Logger) {}

    public async SubscribeDoingThingsStepOne() {
        try {
            const server: ConnectionOptions = {
                servers: this.config.nats.url,
            }

            const natsConnection = await connect(server)
            const sc = StringCodec()

            const subject = 'doing.things.step.one'
            const subscribe = natsConnection.subscribe(subject)

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

    public async PublishDoingThingsStepTwo() {
        try {
            const server: ConnectionOptions = {
                servers: this.config.nats.url,
            }

            const natsConnection = await connect(server)
            const sc = StringCodec()

            const data = JSON.stringify({
                message: 'Doing Things Step Two',
            })

            const subject = 'doing.things.step.two'
            natsConnection.publish(subject, sc.encode(data))

            console.log(`Published to subject ${subject}`)
        } catch (error: any) {
            this.logger.error(error.message)
        }
    }
}

export default Usecase
