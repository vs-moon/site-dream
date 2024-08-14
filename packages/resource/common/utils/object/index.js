import { isObject } from '../type/index.js'

/**
 * 是否空对象
 * @param {*} v
 * @returns
 */
export const isEmpty = (v) => {
  if (isObject(v)) {
    return Reflect.ownKeys(v).length === 0
  } else {
    return true
  }
}

/**
 *
 * @param {Object} source
 * @param {String|Array} attribute
 * @returns {*}
 */
export const valueTaking = (source = null, attribute= null) => {
  if (source && attribute) {
    if (attribute instanceof String && attribute.trim().length > 0) {
      return source[attribute]
    }
    
    if (attribute instanceof Array && attribute.length > 0) {
      const map = attribute.reduce((map, attributeName) => {
        source[attributeName] && (map[attributeName] = source[attributeName])
        return map
      }, {})
      
      if (Reflect.ownKeys(map).length > 0) {
        return map
      }
    }
  }
}

/**
 *
 * @param {Object} source
 * @param {Function} callback
 * @returns {*}
 */
export const filter = (source = null, callback= null) => {
  if (source && callback && callback instanceof Function) {
    const map = Reflect.ownKeys(source).reduce((map, key) => {
      callback(source[key]) && (map[key] = source[key])
      return map
    }, {})
    
    if (Reflect.ownKeys(map).length > 0) {
      return map
    }
  }
}