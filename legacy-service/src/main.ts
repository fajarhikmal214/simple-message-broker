import config from './config/config'
import Logger from './pkg/logger'
import Http from './transport/http/http'
import Example from './internal/example/example'
import Nats from './external/nats'

const main = async () => {
    const { logger } = new Logger(config)
    const http = new Http(logger, config)
    const nats = new Nats(logger, config)

    // Load internal apps
    new Example(http, logger, config, nats)

    if (config.app.env !== 'test') {
        http.Run(config.app.port.http)
    }

    return {
        http,
    }
}

export default main()
