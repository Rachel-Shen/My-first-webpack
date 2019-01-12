import axios from 'axios'
import baseURL from '@/config/index'
import QS from 'qs'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getDefaultConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 6000,
      header: {}
    }
    return config
  }

  interceptors (instance, url) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      // console.log(config);
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res
    }, error => {
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getDefaultConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  getRequest (url, params) {
    return new Promise((resolve, reject) => {
      this.request({
        url: url,
        methods: 'get',
        params: params
      }).then(res => {
        console.log(res)
        resolve(res)
      }).then(error => {
        reject(error)
      })
    })
  }

  postRequest (url, params) {
    return new Promise((resolve, reject) => {
      this.request({
        url: url,
        method: 'post',
        data: QS.stringify(params)
      }).then(res => {
        resolve(res)
      }).then(error => {
        reject(error)
      })
    })
  }
}

export default HttpRequest
