export const UPDATE_MODEL_VALUE = 'update:modelValue'

/**
 * JS 类型
 */
export const JS_TYPE = {
  String: 'String',
  Number: 'Number',
  Float: 'Float',
  Boolean: 'Boolean',
  Null: 'Null',
  Undefined: 'Undefined',
  Symbol: 'Symbol',
  Object: 'Object',
  Array: 'Array',
  Map: 'Map',
  WeakMap: 'WeakMap',
  Set: 'Set',
  WeakSet: 'WeakSet',
  WeakRef: 'WeakRef',
  Function: 'Function',
  AsyncFunction: 'AsyncFunction',
  Promise: 'Promise',
  RegExp: 'RegExp',
  Date: 'Date'
}

export const RESPONSE_STATUS = {
  SUCCESS: {
    code: 200,
    message: 'OK'
  },
  FAIL: {
    code: 500,
    message: 'ERROR'
  },
  DOMAIN_SITE_UNAUTHORIZED: {
    code: 10001,
    message: '域名站点未授权'
  },
  DOMAIN_ACCOUNT_UNAUTHORIZED: {
    code: 10002,
    message: '域名账户未认证'
  }
}