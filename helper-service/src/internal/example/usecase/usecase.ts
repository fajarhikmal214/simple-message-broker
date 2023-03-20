import { connect, ConnectionOptions, JSONCodec, StringCodec } from 'nats'
import { consumerOpts } from 'nats/lib/nats-base-client/jsconsumeropts'
import winston from 'winston'
import { Config } from '../../../config/config.interface'

class Usecase {
    constructor(private config: Config, private logger: winston.Logger) {}

    public async SubscribeDoingThingsStepOne() {
        try {
            const server: ConnectionOptions = {
                servers: this.config.nats.url,
            }

            const nc = await connect(server)
            const jsm = nc.jetstream()

            const jc = JSONCodec()

            const subjectName = 'doing.things.step.one'
            const consumerName = 'my-new-consumer'

            const opts = consumerOpts()
            opts.durable(consumerName)
            opts.queue('my-queue')
            opts.deliverTo('here')
            opts.manualAck()
            opts.ackWait(1000)
            opts.ackExplicit()
            opts.replayInstantly()

            const subscribe = await jsm.subscribe(subjectName, opts)

            for await (const msg of subscribe) {
                msg.ack()

                const id = msg.headers ? msg.headers.get('Nats-Msg-Id') : null
                console.log(
                    `[${id}: SEQUENCE : ${msg.seq}]: ${jc.decode(msg.data)}`
                )
            }

            subscribe.destroy()
            console.log('destroyed')

            // const subscribe = nc.subscribe(subject)

            // ;(async () => {
            //     console.log(`listening for ${subject} requests...`)

            //     for await (const m of subscribe) {
            //         console.log(
            //             `[${subscribe.getProcessed()}]: ${sc.decode(m.data)}`
            //         )
            //     }

            //     console.log('subscription closed')
            // })()
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
