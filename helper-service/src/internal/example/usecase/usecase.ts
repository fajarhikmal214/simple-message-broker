import {
    AckPolicy,
    connect,
    ConnectionOptions,
    createInbox,
    nanos,
    StringCodec,
} from 'nats'
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

            const sc = StringCodec()

            const subjectName = 'doing.things.step.one'
            const consumerName = 'my-new-consumer'

            const opts = consumerOpts()
            opts.durable(consumerName)
            opts.manualAck()
            opts.startSequence(1)

            const psub = await jsm.pullSubscribe(subjectName, opts)

            ;(async () => {
                for await (const m of psub) {
                    console.log(
                        `[${m.seq}] ${
                            m.redelivered
                                ? `- redelivery ${m.info.redeliveryCount}`
                                : sc.decode(m.data)
                        }`
                    )

                    if (m.seq % 2 === 0) {
                        // m.ack()
                    }
                }
            })()

            const fn = () => {
                console.log('[PULL]')
                psub.pull({ batch: 1000, expires: 10000 })
            }

            // do the initial pull
            fn()
            // and now schedule a pull every so often
            const interval = setInterval(fn, 10000) // and repeat every 2s

            // const done = (async () => {
            //     console.log(`listening for ${subjectName} requests...`)

            //     for await (const m of sub) {
            //         console.log(`[${m.seq}]: ${sc.decode(m.data)}`)
            //         m.ack()
            //     }
            // })()

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
