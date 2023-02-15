import axios from 'axios'

class HttpClient {
    public client

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }
}

export default HttpClient
