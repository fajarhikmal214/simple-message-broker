import { NextFunction, Request, Response } from 'express'
import winston from 'winston'
import Usecase from '../../usecase/usecase'
import statusCode from '../../../../pkg/statusCode'

class Handler {
    constructor(private usecase: Usecase, private logger: winston.Logger) {}

    public RequestIsOddOrEven() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.usecase.RequestIsOddOrEven()

                res.status(statusCode.OK).json('OK')
            } catch (error) {
                this.logger.error(error)
                return next(error)
            }
        }
    }

    public PublishDoingThingsStepOne() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.usecase.PublishDoingThingsStepOne()

                res.status(statusCode.OK).json('OK')
            } catch (error) {
                this.logger.error(error)
                return next(error)
            }
        }
    }
}

export default Handler
