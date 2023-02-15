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
    ) {}

    public async Test() {
        // create a codec
        const sc = StringCodec()

        try {
            const response = await this.nats.client?.request('is.odd.or.even')

            console.log(`got response: ${sc.decode(response!.data)}`)
        } catch (error) {
            console.log(`problem with request: ${error}`)
        }
    }
}

export default Usecase
