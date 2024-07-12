import { isArray } from '../type/index.js'

/**
 * 遍历
 * @param {function} call
 * @param {*[]} list
 * @returns {boolean}
 */
export const ergodic = (call, list) => {
  if (isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (!call(list[i])) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
