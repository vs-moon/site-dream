import { isObject } from '../type/index.js'

/**
 * 对象转URL参数
 * @param {*} entity
 * @param {boolean} isQuery
 * @returns {string}
 */
export const toUrlParam = (entity = {}, isQuery = true) => {
  
  if (!isObject(entity)) {
    return ''
  }
  
  const array = []
  
  for (const key in entity) {
    array.push(key + '=' + entity[key])
  }
  
  return (isQuery && array.length > 0 ? '?' : '') + array.join('&')
}

/**
 * 对象转URL
 * @param {string} requestPath
 * @param {*} entity
 * @param {boolean} isQuery
 * @returns {string}
 */
export const toUrl = (requestPath = '', entity = {}, isQuery = true) => {
  return requestPath + toUrlParam(entity, isQuery)
}

/**
 * URL参数转对象
 * @param {string} url
 * @returns
 */
export const toEntity = url => {
  // 取得查询字符串并去掉开头的问号
  const string = url.split('?')[1]
  const args = {}
  const array = string.length ? string.split('&') : []
  let item = null
  let key = null
  let value = null
  const length = array.length
  for (let i = 0; i < length; i++) {
    // 去掉数组每一项的等号并转换为数组
    item = array[i].split('=')
    // 对已编码的字符串进行解码,如果没有编码，则返回字符串的副本
    key = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    // 填入对象
    if (key.length) {
      args[key] = value
    }
  }
  return args
}
