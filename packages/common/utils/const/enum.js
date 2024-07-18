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

/**
 * 路由模式
 */
export const JUMP_MODE = {
  P: 'P',
  N: 'N'
}

/**
 * 菜单模式
 */
export const MENU_MODE = {
  // 详情页
  D: 'D',
  // 管理页
  M: 'M',
  // 路径
  P: 'P'
}

/**
 * 跳转模式属性
 */
export const JUMP_MODE_PROPERTY = {
  [JUMP_MODE.P]: 'routePath',
  [JUMP_MODE.N]: 'routeName'
}

/**
 * 数据有效性
 */
export const VALID = {
  T: '1',
  F: '0'
}

/**
 * 数据有效性-反转
 */
export const VALID_REVERSE = {
  [VALID.T]: VALID.F,
  [VALID.F]: VALID.T
}

/**
 * 数据有效性-文本
 */
export const VALID_TEXT = {
  [VALID.T]: '启用',
  [VALID.F]: '禁用'
}

/**
 * 数据有效性-类型
 */
export const VALID_TYPE = {
  [VALID.T]: 'success',
  [VALID.F]: 'warning'
}

/**
 * 操作方式
 */
export const OPERATE_WAY = {
  SELECT: 'SELECT',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  VALID: 'VALID'
}

/**
 * 视图模式
 */
export const VIEW_MODE = {
  INSERT: 'INSERT',
  MODIFY: 'MODIFY',
  DETAILS: 'DETAILS',
  QUERY: 'QUERY',
}

/**
 * 视图模式映射
 */
export const VIEW_MODE_MAP = {
  [VIEW_MODE.INSERT]: '新增',
  [VIEW_MODE.MODIFY]: '修改',
  [VIEW_MODE.DETAILS]: '详情',
  [VIEW_MODE.QUERY]: '查询',
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