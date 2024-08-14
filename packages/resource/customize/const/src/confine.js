import { PROPERTY_ROUTE } from './property.js'

// 字典类型
export const DIC = {
  APP: 'APP',
  COLOR: 'COLOR',
  CONFIG_DATA_TYPE: 'CONFIG_DATA_TYPE',
  HTTP_METHOD: 'HTTP_METHOD',
  JUMP_MODE: 'JUMP_MODE',
  NAV_TYPE: 'NAV_TYPE',
  TAF: 'TAF',
  VALID: 'VALID',
}


// 路由模式
export const JUMP_MODE = {
  P: 'P',
  N: 'N'
}

// 导航类型
export const NAV_TYPE = {
  // 路径
  P: 'P',
  // 页面
  V: 'V',
  // 控件
  I: 'I'
}

// 跳转模式属性
export const JUMP_MODE_PROPERTY = {
  [JUMP_MODE.P]: PROPERTY_ROUTE.path,
  [JUMP_MODE.N]: PROPERTY_ROUTE.name
}

// 数据有效性
export const VALID = {
  T: '1',
  F: '0'
}

// 数据有效性-反转
export const VALID_REVERSE = {
  [VALID.T]: VALID.F,
  [VALID.F]: VALID.T
}

// 数据有效性-文本
export const VALID_TEXT = {
  [VALID.T]: '启用',
  [VALID.F]: '禁用'
}

// 数据有效性-类型
export const VALID_TYPE = {
  [VALID.T]: 'success',
  [VALID.F]: 'warning'
}

// 操作方式
export const OPERATE_WAY = {
  VIEW: 'View',
  Add: 'Add',
  DELETE: 'Delete',
  EDIT: 'Edit',
  VALID: 'Valid'
}

// 视图模式
export const VIEW_MODE = {
  ADD: 'Add',
  MODIFY: 'Modify',
  VIEW: 'View'
}

// 视图模式映射
export const VIEW_MODE_MAP = {
  [VIEW_MODE.ADD]: '新增',
  [VIEW_MODE.MODIFY]: '修改',
  [VIEW_MODE.VIEW]: '查看'
}

export const VIEW_MODE_TIP_MAP = {
  [VIEW_MODE.ADD]: '保存',
  [VIEW_MODE.MODIFY]: '更新'
}