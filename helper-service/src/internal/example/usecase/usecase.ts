import winston from 'winston'
import { Config } from '../../../config/config.interface'

class Usecase {
    constructor(private config: Config, private logger: winston.Logger) {}

    public async Test() {
        console.log('USECASE CALLED')
    }
}

export default Usecase
