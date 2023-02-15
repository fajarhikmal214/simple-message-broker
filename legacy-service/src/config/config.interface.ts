export interface Config {
    app: {
        name: string
        env: string
        port: {
            http: number
        }
        log: string
        locale: string
    }
    nats: {
        url: string
    }
}
