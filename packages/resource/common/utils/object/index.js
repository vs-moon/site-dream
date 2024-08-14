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