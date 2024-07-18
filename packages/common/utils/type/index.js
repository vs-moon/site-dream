import { isEmpty } from '../string/index.js'
import { JS_TYPE } from '../const/enum.js'

/**
 * 类型
 * @param {*} v
 * @returns {string}
 */
export const JsType = v => {
  const confineType = Reflect.toString.call(v)
  return confineType.substring(8, confineType.length - 1)
}

/**
 * 真值
 * @param {*} v
 * @returns {boolean}
 */
export const isTruly = v => {
  return !isFalsely(v)
}

/**
 * 是否假值
 * @param {*} v
 * @returns {boolean}
 */
export const isFalsely = v => {
  return isNull(v) || isUndefined(v) || isEmpty(v)
}

/**
 * 是否字符串
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isString = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.String : v instanceof String
}

/**
 * 是否数字
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isNumber = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Number : v instanceof Number
}

/**
 * 是否布尔
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isBoolean = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Boolean : v instanceof Boolean
}

/**
 * 是否空
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isNull = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Null : v === null
}

/**
 * 是否未定义
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isUndefined = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Undefined : v === undefined
}

/**
 * 是否Symbol
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isSymbol = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Symbol : v instanceof Symbol
}

/**
 * 是否对象
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isObject = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Object : v instanceof Object
}

/**
 * 是否数组
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isArray = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Array : v instanceof Array
}

/**
 * 是否Map
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isMap = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Map : v instanceof Map
}

/**
 * 是否弱键
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakMap = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WeakMap : v instanceof WeakMap
}

/**
 * 是否Set
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isSet = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Set : v instanceof Set
}

/**
 * 是否弱值
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakSet = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WeakSet : v instanceof WeakSet
}

/**
 * 是否弱引用
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakRef = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WeakRef : v instanceof WeakRef
}

/**
 * 是否函数
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isFunction = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Function : v instanceof Function
}

/**
 * 是否异步函数
 * @param {*} v
 * @returns {boolean}
 */
export const isAsyncFunction = (v) => {
  return JsType(v) === JS_TYPE.AsyncFunction
}

/**
 * 是否承诺
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isPromise = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Promise : v instanceof Promise
}

/**
 * 是否正则表达式
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isRegExp = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.RegExp : v instanceof RegExp
}

/**
 * 是否日期
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isDate = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.Date : v instanceof Date
}