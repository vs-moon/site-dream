import { isEmpty } from '../string/index.js'
import { JS_TYPE, NAMING } from '../const/enum.js'

/**
 * 类型
 * @param {*} v
 * @param {string} caseFormat
 * @returns {string}
 */
export const JsType = (v, caseFormat = NAMING.UPPER) => {
  const confineType = Reflect.toString.call(v)
  const protoType = confineType.substring(8, confineType.length - 1)
  return caseFormat === NAMING.UPPER ? protoType.toLocaleUpperCase() : protoType
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
  return isTag ? JsType(v) === JS_TYPE.STRING : v instanceof String
}

/**
 * 是否数字
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isNumber = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.NUMBER : v instanceof Number
}

/**
 * 是否布尔
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isBoolean = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.BOOLEAN : v instanceof Boolean
}

/**
 * 是否空
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isNull = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.NULL : v === null
}

/**
 * 是否未定义
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isUndefined = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.UNDEFINED : v === undefined
}

/**
 * 是否Symbol
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isSymbol = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.SYMBOL : v instanceof Symbol
}

/**
 * 是否对象
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isObject = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.OBJECT : v instanceof Object
}

/**
 * 是否数组
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isArray = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.ARRAY : v instanceof Array
}

/**
 * 是否Map
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isMap = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.MAP : v instanceof Map
}

/**
 * 是否弱键
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakMap = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WEAK_MAP : v instanceof WeakMap
}

/**
 * 是否Set
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isSet = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.SET : v instanceof Set
}

/**
 * 是否弱值
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakSet = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WEAK_SET : v instanceof WeakSet
}

/**
 * 是否弱引用
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isWeakRef = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.WEAK_REF : v instanceof WeakRef
}

/**
 * 是否函数
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isFunction = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.FUNCTION : v instanceof Function
}

/**
 * 是否异步函数
 * @param {*} v
 * @returns {boolean}
 */
export const isAsyncFunction = (v) => {
  return JsType(v) === JS_TYPE.ASYNC_FUNCTION
}

/**
 * 是否承诺
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isPromise = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.PROMISE : v instanceof Promise
}

/**
 * 是否正则表达式
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isRegExp = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.REG_EXP : v instanceof RegExp
}

/**
 * 是否日期
 * @param {*} v
 * @param {boolean} isTag
 * @returns {boolean}
 */
export const isDate = (v, isTag = true) => {
  return isTag ? JsType(v) === JS_TYPE.DATE : v instanceof Date
}