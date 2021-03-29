import { AxiosRequestConfig } from 'axios'
export {}
declare global {
  interface Window {
    attachEvent(type: string, callback: any): void
    detachEvent(type: string, callback: any): void
    md5(value: string, key?: string, bol?: boolean): string
    TweenMax(): void
    TimelineLite(): void
    Linear(): void
    zrender(): void
  }
  /**
   * 返回结果数据接口格式
   */
  interface IResponse<T = any> {
    status: number
    code: number
    data: T
    message: string
    success: boolean
    errorMessage: string
    errcode: string
    msg: string
    total: number
  }
}
