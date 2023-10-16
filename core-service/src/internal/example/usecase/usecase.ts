import { randomInt, randomUUID } from 'crypto'
import { connect, ConnectionOptions, JSONCodec, StringCodec } from 'nats'
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

    public async setupStream() {
        const server: ConnectionOptions = {
            servers: this.config.nats.url,
        }

        const nc = await connect(server)
        const jsm = await nc.jetstreamManager()

        const streamName = 'my-new-stream'
        const subjectNames = ['doing.things.>']

        try {
            // await jsm.streams.delete('my-new-stream')

            const streamInfo = await jsm.streams.add({
                name: streamName,
                subjects: subjectNames,
                // max_msgs: 1000000,
                // max_bytes: 1024 * 1024 * 1024, // 1 GB
                // max_age: 7 * 24 * 60 * 60 * 1000,
            })

            console.log(`Stream created: ${streamInfo.config.name}`)

            // consumer will auto-create when subscriber request
        } catch (err) {
            console.error(`${err}`)
        }

        await nc.close()
    }

    public async PublishDoingThingsStepOne() {
        try {
            const server: ConnectionOptions = {
                servers: this.config.nats.url,
            }

            const nc = await connect(server)
            const jsm = nc.jetstream()

            const jc = JSONCodec()

            const data = JSON.stringify({
                message: 'Doing Things Step One',
            })

            const subject = 'doing.things.step.one'
            // natsConnection.publish(subject, sc.encode(data))

            const publishMessage = await jsm.publish(subject, jc.encode(data), {
                msgID: randomUUID(),
            })

            console.log(publishMessage)
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
