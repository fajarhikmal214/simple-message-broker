import lang from 'i18n'
import config from '../config/config'

lang.configure({
    locales: ['en', 'id'],
    directory: __dirname + '/lang',
    defaultLocale: config.app.locale ?? 'id',
})

export default lang
