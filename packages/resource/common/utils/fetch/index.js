import { isReactive, isRef, toRaw, unref, watch } from 'vue'
import { createFetch } from '@vueuse/core'
import { ElNotification } from 'element-plus'

import { toUrl } from '../url/index.js'
import { removeEmptyProp } from '../package/index.js'
import { isNumber, isObject } from '../type/index.js'
import { useAuthorizationStore, useReset } from '../store/index.js'
import { useRouter, ROUTE_CONST } from '../router/index.js'

const router = useRouter()

// 鉴权头
export const AUTHORIZATION_HEAD = {
  AUTHORIZATION: 'Authorization',
  AUTHORIZATION_CROSS: 'Authorization-Cross',
  AUTHORIZATION_CROSS_SITE: 'Authorization-Cross-Site',
  AUTHORIZATION_RENEWAL: 'Authorization-Renewal',
  AUTHORIZATION_HIBERNATION: 'Authorization-Hibernation',
  AUTHORIZATION_REMEMBER: 'Authorization-Remember'
}

// 请求方式
export const REQUEST_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options',
  HEAD: 'head'
}

// 请求方式 values
export const REQUEST_METHOD_VALUES = Object.values(REQUEST_METHOD)

// 响应类型
export const RESPONSE_TYPE = {
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob',
  ARRAY_BUFFER: 'arrayBuffer',
  FORM_DATA: 'formData'
}

// 响应类型 values
export const RESPONSE_TYPE_VALUES = Object.values(RESPONSE_TYPE)

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
    this.options = Reflect.construct(UseFetchOptions, [ options ])
    // fetch 原生选项
    this.fetchOptions = Reflect.construct(Request, [ '', { ...fetchOptions } ])
  }
}

// 自定义 Fetch 类
export class VSFetch {
  authorization
  config
  useFetch
  
  constructor({
    baseUrl,
    combination,
    options,
    fetchOptions,
    authorization = true
  }) {
    
    this.authorization = authorization
    
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
    const { success, message } = toRaw(data)
    ElNotification({
      title: success ? 'Success' : 'Fail',
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
    
    if (this.authorization) {
      
      const authorizationStore = useAuthorizationStore()
      
      const routine = authorizationStore.routine
      const hibernation = authorizationStore.hibernation
      const remember = authorizationStore.remember

      if (routine) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION] = routine
      }
      
      if (hibernation) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION_HIBERNATION] = hibernation
      }

      if (remember) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION_REMEMBER] = remember
      }
    }
    
    return {
      options
    }
  }
  
  onResponseAfter({ response, data }) {
    
    if (this.authorization) {
      
      const { code } = data
      
      const routine = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION)
      const renewal = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_RENEWAL)
      const cross = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_CROSS)
      const crossSite = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_CROSS_SITE)
      const hibernation = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_HIBERNATION)
      
      const authorizationStore = useAuthorizationStore()
      
      if (routine) {
        authorizationStore.routine = routine
        authorizationStore.enable = true
      }
      
      if (renewal) {
        authorizationStore.routine = renewal
      }

      if (cross) {
        authorizationStore.cross = cross
      }
      
      if (crossSite) {
        authorizationStore.crossSite = crossSite
      }
      
      if (hibernation) {
        authorizationStore.hibernation = hibernation
      }
      
      if (code === 10011) {
        useReset()
        router.value.push({ path: ROUTE_CONST.entrance.path })
      }
    }
    
    return {
      response,
      data
    }
  }
  
  onCatch({ response, data, error }) {
    return { response, data, error }
  }
  
  useResponse(useFetchShell, immediate) {
    const {
      execute = () => {},
      data,
      ...other
    } = useFetchShell
    
    const notification = () => {
      this.onNotification(data)
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
    
    const isGet = method === REQUEST_METHOD.GET
    
    if (isGet) {
      url = toUrl(unref(url), unref(params))
    } else {
      params = this.onRequestParam(unref(params))
    }
    
    const useFetchShellPrepare = this.useFetch(url, useFetchOptions)
    const useFetchShellMethod = isGet ? useFetchShellPrepare[method]() : useFetchShellPrepare[method](params)
    const useFetchShellType = useFetchShellMethod[type]()
    
    return this.useResponse(useFetchShellType, useFetchOptions.immediate ?? this.config.options.immediate)
    
  }
  
  get({ url, params, method = REQUEST_METHOD.GET, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  post({ url, params, method = REQUEST_METHOD.POST, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  put({ url, params, method = REQUEST_METHOD.PUT, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  delete({ url, params, method = REQUEST_METHOD.DELETE, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  patch({ url, params, method = REQUEST_METHOD.PATCH, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  head({ url, params, method = REQUEST_METHOD.HEAD, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
  }
  
  options({ url, params, method = REQUEST_METHOD.OPTIONS, type }, useFetchOptions) {
    return this.execute({ url, params, method, type }, useFetchOptions)
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