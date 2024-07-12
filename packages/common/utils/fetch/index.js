import { isReactive, isRef, unref, watch } from 'vue'
import { createFetch } from '@vueuse/core'
import { ElNotification } from 'element-plus'

import { toUrl } from '../url/index.js'
import { removeEmptyProp } from '../package/index.js'
import { isNumber, isObject } from '../type/index.js'
import { useAuthorizationStore, useReset } from '../store/index.js'
import { useRouter, ROUTE_CONST } from '../router/index.js'

const router = useRouter()

export const AUTHORIZATION_HEAD = {
  AUTHORIZATION: 'Authorization',
  AUTHORIZATION_HIBERNATION: 'Authorization-Hibernation',
  AUTHORIZATION_REMEMBER: 'Authorization-Remember'
}

export const REQUEST_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options',
  HEAD: 'head'
}

export const REQUEST_METHOD_VALUES = Object.values(REQUEST_METHOD)

export const RESPONSE_TYPE = {
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob',
  ARRAY_BUFFER: 'arrayBuffer',
  FORM_DATA: 'formData'
}

export const RESPONSE_TYPE_VALUES = Object.values(RESPONSE_TYPE)

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

class FetchConfig {
  baseUrl
  combination
  options
  fetchOptions
  
  constructor({ baseUrl, combination = 'chain', options, fetchOptions = { mode: 'cors' } } = {}) {
    this.baseUrl = baseUrl
    this.combination = combination
    this.options = Reflect.construct(UseFetchOptions, [ options ])
    this.fetchOptions = Reflect.construct(Request, [ '', { ...fetchOptions } ])
  }
}

export class VSFetch {
  authorization
  config
  useFetch
  
  constructor({ baseUrl, combination, options, fetchOptions, authorization = true } = {}) {
    
    this.authorization = authorization
    
    this.config = Reflect.construct(FetchConfig, [
      { baseUrl, combination, options, fetchOptions }
    ])
    
    this.config.options.beforeFetch = ctx => this.onRequestBefore.call(this, ctx)
    this.config.options.afterFetch = ctx => this.onResponseAfter.call(this, ctx)
    this.config.options.onFetchError = ctx => this.onCatch.call(this, ctx)
    
    this.useFetch = createFetch(this.config)
  }
  
  onNotification(data) {
    const { success, message } = data.value
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
      
      const roution = authorizationStore.routine
      const hibernation = authorizationStore.hibernation
      const remember = authorizationStore.remember
      
      if (roution) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION] = roution
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
      
      const roution = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION)
      const hibernation = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_HIBERNATION)
      
      const authorizationStore = useAuthorizationStore()
      
      if (roution) {
        authorizationStore.routine = roution
        authorizationStore.enable = true
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
    
    if (!RESPONSE_TYPE_VALUES.includes(type)) {
      throw new Error('Illegal Params: ' + type)
    }
    
    if (!REQUEST_METHOD_VALUES.includes(method)) {
      throw new Error('Illegal method: ' + method)
    }
    
    const isGet = method === REQUEST_METHOD.GET
    
    if (isGet) {
      params = isRef(params) ? params.value : params
      url = toUrl(isRef(url) ? url.value : url, params)
    } else {
      params = this.onRequestParam(isRef(params) ? params.value : params)
    }
    
    const useFetchShellPrepare = this.useFetch(url, useFetchOptions)
    const useFetchShellMethod = isGet ? useFetchShellPrepare[method]() : useFetchShellPrepare[method](params)
    const useFetchShellType = useFetchShellMethod[type]()
    
    return this.useResponse(useFetchShellType, useFetchOptions.immediate ?? this.config.options.immediate)
    
  }
  
  request({ url, params, method, type }, useFetchOptions = {}) {
    
    const run = () => this.execute({ url, params, method, type }, useFetchOptions)
    
    if (useFetchOptions.refetch ?? this.config.options.refetch) {
      if (isRef(url)) {
        watch(url, () => {
          run()
        })
      }
      
      if (isRef(params) || isReactive(params)) {
        watch(params, () => {
          run()
        })
      }
    }
    
    return run()
  }
  
  get({ url, params, method = REQUEST_METHOD.GET, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  post({ url, params, method = REQUEST_METHOD.POST, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  put({ url, params, method = REQUEST_METHOD.PUT, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  delete({ url, params, method = REQUEST_METHOD.DELETE, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  patch({ url, params, method = REQUEST_METHOD.PATCH, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  head({ url, params, method = REQUEST_METHOD.HEAD, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
  }
  
  options({ url, params, method = REQUEST_METHOD.OPTIONS, type }, useFetchOptions = {}) {
    return this.request({ url, params, method, type }, useFetchOptions)
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

export const createInstance = fetchConfig => {
  const context = Reflect.construct(VSFetch, [ fetchConfig ])
  const instance = ({ url, params, responseType }, requestInit, useFetchOptions, requestMethod) =>
    context.request.call(context, { url, params, responseType }, requestInit, useFetchOptions, requestMethod)
  
  Reflect.setPrototypeOf(instance, context)
  
  return instance
}