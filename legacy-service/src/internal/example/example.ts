import winston from 'winston'
import { Config } from '../../config/config.interface'
import Http from '../../transport/http/http'
import Handler from './delivery/http/handler'
import Usecase from './usecase/usecase'
import Nats from '../../external/nats'

class Example {
    constructor(
        private http: Http,
        private logger: winston.Logger,
        private config: Config,
        private nats: Nats
    ) {
        const usecase = new Usecase(config, logger, nats)

        usecase.ReplyIsOddOrEven()

        this.loadHttp(usecase)
    }

    private loadHttp(usecase: Usecase) {
        const handler = new Handler(usecase, this.logger)
    }
}

export default Example
