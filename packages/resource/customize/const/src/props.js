import { VIEW_MODE } from '../index.js'

// 详情页属性
export const PROPS_PAGE_VIEW = {
  id: {
    type: String,
    default: '0'
  },
  vm: {
    type: String,
    default: '',
    validator: value => {
      return Object.values(VIEW_MODE).includes(value)
    }
  }
}