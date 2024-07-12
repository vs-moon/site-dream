import { isString, isTruly } from '../type/index.js'

/**
 * 是否为空字符串
 * @param {*} v
 * @returns {boolean}
 */
export const isEmpty = v => {
  if (isString(v)) {
    return !v.length
  } else {
    return false
  }
}

/**
 * 是否为空字符串或只存在空格
 * @param {*} v
 * @returns {boolean}
 */
export const isBlank = v => {
  if (isEmpty(v)) {
    return true
  } else if (isTruly(v)) {
    return isString(v) ? isEmpty((v).replaceAll(' ', '')) : false
  } else {
    return true
  }
}

/**
 * /([^_])(?:_+([^_]))/g
 * 下划线转驼峰
 * @param {string} string
 * @returns {string}
 */
export const toHump = (string) => {
  return string.replace(/([^_])_+([^_])/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase()
  })
}

/**
 * 驼峰转下划线
 * @param {string} string
 * @returns {string}
 */
export const toUnderline = (string) => {
  let temp = string.replace(/[A-Z]/g, (match) => {
    return '_' + match.toLowerCase()
  })
  // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
  if (temp.slice(0, 1) === '_') {
    temp = temp.slice(1)
  }
  return temp
}

