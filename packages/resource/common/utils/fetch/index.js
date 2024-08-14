import { toRaw, toValue, unref } from 'vue'
import { createFetch } from '@vueuse/core'
import { ElNotification } from 'element-plus'

import { toUrl } from '../url/index.js'
import { removeEmptyProp } from '../package/index.js'
import { isEmpty } from '../object/index.js'
import { isNumber, isObject, isFalsely } from '../type/index.js'

// 鉴权头
export const AUTHORIZATION_HEAD = Object.freeze({
  AUTHORIZATION: 'Authorization',
  AUTHORIZATION_CROSS: 'Authorization-Cross',
  AUTHORIZATION_CROSS_SITE: 'Authorization-Cross-Site',
  AUTHORIZATION_RENEWAL: 'Authorization-Renewal',
  AUTHORIZATION_HIBERNATION: 'Authorization-Hibernation',
  AUTHORIZATION_REMEMBER: 'Authorization-Remember'
})

// 请求方式
export const REQUEST_METHOD = Object.freeze({
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options',
  HEAD: 'head'
})

// 请求方式 values
const REQUEST_METHOD_VALUES = Object.values(REQUEST_METHOD)

// 响应类型
export const RESPONSE_TYPE = Object.freeze({
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob',
  ARRAY_BUFFER: 'arrayBuffer',
  FORM_DATA: 'formData'
})

// 响应类型 values
const RESPONSE_TYPE_VALUES = Object.values(RESPONSE_TYPE)

// 第三方 useFetch 参数选项
class UseFetchOptions {
  constructor({
                fetch,
                immediate = true,
                refetch = false,
                initialData = null,
                timeout = 3000,
                updateDataOnError = true
              } = {}) {
    this.fetch = fetch
    this.immediate = immediate
    this.refetch = refetch
    this.initialData = initialData
    this.timeout = timeout
    this.updateDataOnError = updateDataOnError
    this.beforeFetch = null
    this.afterFetch = null
    this.onFetchError = null
  }
}

// 第三方 useFetch 配置
class FetchConfig {
  baseUrl
  combination
  options
  fetchOptions
  
  constructor({ baseUrl, combination = 'chain', options, fetchOptions = { mode: 'cors' } } = {}) {
    this.baseUrl = baseUrl
    this.combination = combination
    // useFetch 选项
    this.options = Reflect.construct(UseFetchOptions, [ options ])
    // fetch 原生选项
    this.fetchOptions = Reflect.construct(Request, [ '', { ...fetchOptions } ])
  }
}

// 自定义 Fetch 类
export class VSFetch {
  authorization
  failNotification
  config
  useFetch
  
  constructor({
    baseUrl,
    combination,
    options,
    fetchOptions,
    authorization = true,
    failNotification = true
  }) {
    
    this.authorization = authorization
    this.failNotification = failNotification
    
    this.config = Reflect.construct(FetchConfig,
      [{
        baseUrl,
        combination,
        options,
        fetchOptions
      }])
    
    this.config.options.beforeFetch = ctx => this.onRequestBefore.call(this, ctx)
    this.config.options.afterFetch = ctx => this.onResponseAfter.call(this, ctx)
    this.config.options.onFetchError = ctx => this.onCatch.call(this, ctx)
    
    this.useFetch = createFetch(this.config)
  }
  
  onNotification(data) {
    const { success, message = '' } = toRaw(data)
    ElNotification({
      title: success ? '请求成功' : '请求失败',
      type: success ? 'success' : 'error',
      message,
      offset: 80,
      duration: 1000
    })
  }
  
  onRequestParam(param) {
    if (isObject(param)) {
      removeEmptyProp(param)
      const { pageNum, pageSize, ...args } = param
      param = { args }
      if (isNumber(pageNum) && isNumber(pageSize)) {
        param.paging = { pageNum, pageSize }
      }
    } else {
      param = { args: param }
    }
    
    return param
  }
  
  async onRequestBefore({ options, cancel, url },) {
    return {
      options
    }
  }
  
  onResponseAfter({ response, data }) {
    return {
      response,
      data
    }
  }
  
  onCatch({ response, data, error }) {
    
    const { message } = data
    
    ElNotification({
      title: 'Fail',
      type: 'error',
      message,
      offset: 80,
      duration: 1000
    })
    
    return { response, data, error }
  }
  
  useResponse(useFetchShell, immediate) {
    const {
      execute = () => {},
      data,
      ...other
    } = useFetchShell
    
    const notification = () => {
      this.onNotification(toValue(data))
    }
    
    const unpacking = () => ({ ...unref(data) })
    
    return {
      data,
      notification,
      ...other,
      then: (onResolve, onReject) => {
        const promise = immediate ? useFetchShell : execute()
        return usePromiseChain(promise, unpacking)
          .then(onResolve, onReject)
      }
    }
  }
  
  execute({ url, params = {}, method = REQUEST_METHOD.GET, type = RESPONSE_TYPE.JSON }, useFetchOptions = {}) {
    
    if (!REQUEST_METHOD_VALUES.includes(method)) {
      throw new Error(`Request methods beyond the agreement: ${method}`)
    }
    
    if (!RESPONSE_TYPE_VALUES.includes(type)) {
      throw new Error(`Response type beyond the agreement: ${type}`)
    }
    
    const isGet = method === REQUEST_METHOD.GET
    
    if (isGet) {
      if (!isEmpty(params) && !isFalsely(params)) {
        url = toUrl(unref(url), unref(params))
      }
    } else {
      params = this.onRequestParam(unref(params))
    }
    
    const useFetchShellPrepare = this.useFetch(url, useFetchOptions)
    const useFetchShellMethod = isGet ? useFetchShellPrepare[method]() : useFetchShellPrepare[method](params)
    const useFetchShellType = useFetchShellMethod[type]()
    
    return this.useResponse(useFetchShellType, useFetchOptions.immediate ?? this.config.options.immediate)
    
  }
  
  get({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.GET, type }, useFetchOptions)
  }
  
  post({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.POST, type }, useFetchOptions)
  }
  
  put({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.PUT, type }, useFetchOptions)
  }
  
  delete({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.DELETE, type }, useFetchOptions)
  }
  
  patch({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.PATCH, type }, useFetchOptions)
  }
  
  head({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.HEAD, type }, useFetchOptions)
  }
  
  options({ url, params, type }, useFetchOptions = {}) {
    return this.execute({ url, params, method: REQUEST_METHOD.OPTIONS, type }, useFetchOptions)
  }
}

const usePromiseChain = (promise, onParams) => {
  return new Promise((onResolve, onReject) => {
    promise.then(resolve => {
      onResolve(onParams ? onParams(resolve) : resolve)
    }, reject => {
      onReject(reject)
    })
  })
}