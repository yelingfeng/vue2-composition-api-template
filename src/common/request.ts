import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { REQUEST_STATUS } from './enum'
import qs from 'qs'

const instance: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 120000
  // withCredentials: true // send cookies when cross-domain requests
})
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const sendMessage = (msg: string, type: ElMessageOptions) => {
  ;(Message as any).closeAll()
  Message({
    message: msg,
    customClass: 'customMessage',
    type,
    duration: 2000
  })
}
type ElMessageOptions = 'success' | 'warning' | 'info' | 'error' | undefined
type MethodType = 'post' | 'get' | 'delete' | 'put'

// Request interceptors
// instance.interceptors.request.use(
//   config => {
//     if (getCookies('szCode')) {
//       config.headers['token'] = getCookies('szCode')
//     }
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )
// Response interceptors
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // error
    if (response.status == REQUEST_STATUS.ERROR) {
      sendMessage(res.message, 'error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    // 重定向
    else if (res.code === REQUEST_STATUS.REDIRECT) {
      // token失效，重定向
      MessageBox.confirm('您已被登出，请重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        type: 'warning'
      })
        .then(() => {
          // store.dispatch('user/RESET_TOKEN')
        })
        .catch((action: any) => {
          // sendMessage(`action: ${action}`, 'error')
          sendMessage(`操作已取消`, 'error')
        })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // sendMessage(res.message, 'success')
      return Promise.resolve(response)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    sendMessage(error.message, 'error')
    return Promise.reject(error)
  }
)
/**
 * 通用request封装
 */
const request = <T>(method: MethodType, url: string, data: any, config = {}): Promise<IResponse<T>> => {
  const options: AxiosRequestConfig = Object.assign({}, config, {
    url,
    method,
    data
  })
  options.cancelToken = source.token
  options.headers = options.headers || {}
  return new Promise((resolve, reject) => {
    instance
      .request<IResponse<T>>(options)
      .then((resp: any) => {
        const resultData = resp.data
        if (resultData['type'] === 'application/vnd.ms-excel') {
          return resolve(resp)
        }
        if (resultData.status === REQUEST_STATUS.SUCCESS) {
          // sendMessage(resultData.message, 'success')
          resolve(resp.data)
        } else {
          sendMessage(resultData.message, 'error')
          reject(resp.data)
        }
      })
      .catch(res => {
        if (axios.isCancel(res)) {
          console.log('error', '请求中断')
        }
        reject(res)
      })
  })
}

interface IHttpInstance {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<IResponse<T>>
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<IResponse<T>>
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<IResponse<T>>
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<IResponse<T>>
}

export const http: IHttpInstance = {
  get<T>(url: string, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return request<T>('get', url, null, config)
  },
  delete<T>(url: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return request<T>('delete', url, data, config)
  },
  post<T>(url: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    if (!config.headers) {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    return request<T>('post', url, qs.stringify(data), config)
  },
  put<T>(url: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    config.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    return request<T>('put', url, data, config)
  }
}
