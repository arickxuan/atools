import {listen} from '@tauri-apps/api/event';
import axios from "axios";

export class Request {
    //  readonly ctx: IPicGo
    proxy = ''
    options = {}
    constructor(ctx) {
        this.ctx = ctx
        this.init()
        
    }

    init() {
        const proxy = this.ctx.getConfig < Undefinable < string >> ('picBed.proxy')
        if (proxy) {
            this.proxy = proxy
        }
        listenEvent()
    }

    listenEvent = listen(IBusEvent.CONFIG_CHANGE, (event) => {
        console.log(`Got error in window ${event.windowLabel}, payload: ${event.payload}`);
        switch (event.payload.configName) {
            case 'picBed':
                if (event.payload.value) {
                    this.proxy = (event.payload.value).proxy
                }
                break
            case 'picBed.proxy':
                this.proxy = event.payload.value
                break
        }
    });
    

    handleProxy() {
        if (this.proxy) {
            try {
                const proxyOptions = new URL(this.proxy)
                return {
                    host: proxyOptions.hostname,
                    port: parseInt(proxyOptions.port || '0', 10),
                    protocol: proxyOptions.protocol
                }
            } catch (e) {
            }
        }
        return false
    }

    // #64 dynamic get proxy value
    request(options) {
        this.options.proxy = this.handleProxy()
        this.options.headers = options.headers || {}
        this.options.maxBodyLength = Infinity
        this.options.maxContentLength = Infinity
        if (this.options.proxy && options.url?.startsWith('https://')) {
            this.options.httpsAgent = tunnel.httpsOverHttp({
                proxy: {
                    host: this.options.proxy.host,
                    port: this.options.proxy.port
                }
            })
            this.options.proxy = false
        } else {
            this.options.httpsAgent = httpsAgent
        }
        // !NOTICE this.options !== options
        // this.options is the default options
        const instance = axios.create(this.options)
        instance.interceptors.response.use(responseInterceptor, responseErrorHandler)

        // compatible with old request options to new options
        const opt = requestInterceptor(options)

        instance.interceptors.request.use(function (obj) {
            // handle Content-Type
            let contentType = ''
            if (obj?.headers?.contentType) {
                contentType = obj.headers.contentType
                delete obj.headers.contentType
            } else if (obj?.headers?.ContentType) {
                contentType = obj.headers.ContentType
                delete obj.headers.ContentType
            } else if (obj?.headers?.['content-type']) {
                contentType = obj.headers['content-type']
                delete obj.headers['content-type']
            }
            if (contentType !== '' && obj.headers) {
                obj.headers['Content-Type'] = contentType
            }
            return obj
        })
        if ('resolveWithFullResponse' in options && options.resolveWithFullResponse) {
            return instance.request(opt)
        } else {
            return instance.request(opt).then(res => {
                // use old request option format
                if (opt.__isOldOptions) {
                    if ('json' in options) {
                        if (options.json) {
                            return res.data
                        }
                    } else {
                        return JSON.stringify(res.data)
                    }
                } else {
                    return res.data
                }
            })
        }
    }
}

export default Request

const httpsAgent = new https.Agent({
    maxVersion: 'TLSv1.2',
    minVersion: 'TLSv1.2'
})

// thanks for https://github.dev/request/request/blob/master/index.js
function appendFormData(form, key, data) {
    if (typeof data === 'object' && 'value' in data && 'options' in data) {
        form.append(key, data.value, data.options)
    } else {
        form.append(key, data)
    }
}

function requestInterceptor(options) {
    __isOldOptions
} {
    let __isOldOptions = false
    // user request config proxy
    if (options.proxy) {
        let proxyOptions = options.proxy
        if (typeof proxyOptions === 'string') {
            try {
                proxyOptions = new URL(options.proxy)
            } catch (e) {
                proxyOptions = false
                opt.proxy = false
                console.error(e)
            }
            __isOldOptions = true
        }
        if (proxyOptions) {
            if (options.url?.startsWith('https://')) {
                opt.proxy = false
                opt.httpsAgent = tunnel.httpsOverHttp({
                    proxy: {
                        host: proxyOptions?.hostname,
                        port: parseInt(proxyOptions?.port, 10)
                    }
                })
            } else {
                opt.proxy = {
                    host: proxyOptions.hostname,
                    port: parseInt(proxyOptions.port, 10),
                    protocol: 'http'
                }
            }
        }
    }
    if ('formData' in options) {
        const form = new FormData()
        for (const key in options.formData) {
            const data = options.formData[key]
            appendFormData(form, key, data)
        }
        opt.data = form
        opt.headers = Object.assign(opt.headers || {}, form.getHeaders())
        __isOldOptions = true
        // @ts-expect-error
        delete opt.formData
    }
    if ('body' in options) {
        opt.data = options.body
        __isOldOptions = true
        // @ts-expect-error
        delete opt.body
    }
    if ('qs' in options) {
        opt.params = options.qs
        __isOldOptions = true
    }
    opt.__isOldOptions = __isOldOptions
    return opt
}

function responseInterceptor(response) {
    return {
        ...response,
        statusCode: response.status,
        body: response.data
    }
}

function responseErrorHandler(error) {
    // if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   return Promise.reject(erro)
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   return Promise.reject(error.request)
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   return Promise.reject(error.message)
    // }
    const errorObj = {
        method: error?.config?.method?.toUpperCase() || '',
        url: error?.config?.url || '',
        statusCode: error?.response?.status || 0,
        message: error?.message || '',
        stack: error?.stack || {},
        response: {
            status: error?.response?.status || 0,
            statusCode: error?.response?.status || 0,
            body: error?.response?.data || ''
        }
    }
    return Promise.reject(errorObj)
}

