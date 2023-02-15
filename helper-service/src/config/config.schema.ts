import Joi from 'joi'

export default Joi.object({
    APP_NAME: Joi.string().required(),
    APP_ENV: Joi.string()
        .valid('local', 'staging', 'production')
        .default('local'),
    APP_PORT_HTTP: Joi.number().required(),
    APP_LOG: Joi.string().valid('info', 'error', 'warn').required(),
    APP_LOCALE: Joi.string().valid('en', 'id').optional(),
    NATS_URL: Joi.string().required(),
})
