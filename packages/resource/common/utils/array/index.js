import { isArray } from '../type/index.js'

/**
 * 是否空数组
 * @param {*} v
 * @returns
 */
export const isEmpty = (v) => {
  if (isArray(v)) {
    return v.length === 0
  } else {
    return true
  }
}