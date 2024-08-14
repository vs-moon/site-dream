import { JS_TYPE } from '@vs-common/const'
import { JsType, isArray, isObject, isTruly, isFunction } from '../type/index.js'
import { isEmpty as isEmptyArray } from '../array/index.js'
import { isEmpty as isEmptyObject } from '../object/index.js'
import { isEmpty as isEmptyString } from '../string/index.js'

/**
 * 分组
 * @param {*} list
 * @param {*} groupKey
 * @returns
 */
export const grouping = (list = [], groupKey = 'group') => {
  const map = {}
  for (const item of (list || [])) {
    const groupValue = item[groupKey] || 'DEFAULT'
    if (map[groupValue]) {
      map[groupValue].push(item)
    } else {
      map[groupValue] = []
      map[groupValue].push(item)
    }
  }
  return map
}

/**
 * 按指定大小切块
 * @param {*} source
 * @param {*} size
 * @param {function} filter
 */
export const chunking = (source, { size = 3, filter }) => {
  const group = []
  if (isObject(source)) {
    let count = 0
    let current = {}
    Reflect.ownKeys(source).forEach(key => {
      if (isFunction(filter)) {
        if (!filter(source[key])) {
          return false
        }
      }
      count++
      current[key] = source[key]
      if (count === size) {
        group.push(current)
        count = 0
        current = {}
      }
    })
    
    if (count) {
      group.push(current)
    }
  } else if (isArray(source)) {
    for (let i = 0, len = source.length; i < len; i += size) {
      group.push(source.slice(i, i + size))
    }
  } else {
    return source
  }
  
  return group
}

/**
 * 数组转树
 * @returns
 * @param array
 * @param options
 */
export const toBranch = (array = [], options = {
  primaryKey: 'id',
  parentKey: 'pid',
  children: 'children'
}) => {
  if (isArray(array)) {
    
    const { primaryKey, parentKey, children, parent } = options
    
    const make = () => {
      
      const source = JSON.parse(JSON.stringify(array))
      
      const mapping = source.reduce((map, node) => {
        map[node[primaryKey]] = node
        node[children] = []
        return map
      }, {})
      
      const nesting = source.filter(node => {
        if (node[parentKey] && mapping[node[parentKey]]) {
          mapping[node[parentKey]][children].push(node)
          return false
        } else {
          return true
        }
      })
      
      return {
        source,
        mapping,
        nesting
      }
    }
    
    return make()
  } else {
    console.error('Argument [ array ] should be an array')
  }
}

/**
 * 树转数组
 * @param source
 * @param childrenKey
 * @param target
 * @param decorate
 * @returns {*[]}
 */
export const toArray = ({ source = null, childrenKey = 'children', target = [], decorate }) => {
  if (isTruly(source)) {
    
    const {
      [childrenKey]: children,
      ...other
    } = source
    
    if (isArray(source)) {
      for (let i in source) {
        
        const {
          [childrenKey]: children,
          ...other
        } = source[i]
        
        const decorateItem = decorate ? decorate({ ...other }) : { ...other }
        target.push(decorateItem)
        if (isArray(children)) {
          toArray({ source: children, childrenKey, target, decorate })
        }
      }
    } else if (isObject(source)) {
      const decorateItem = decorate ? decorate({ ...other }) : { ...other }
      target.push(decorateItem)
      if (isArray(children)) {
        toArray({ source: children, childrenKey, target, decorate })
      }
    }
  }
  
  return target
}

/**
 * 元数组去重
 * @param {[]} array
 * @param {string} prop
 * @param {Map<string, any>} roster
 * @returns
 */
export const atomArrayUnique = (array, prop, roster = new Map()) => {
  return array.filter((item) => !roster.has(item[prop]) && roster.set(item[prop], null))
}

/**
 * 移除空属性
 * @returns
 * @param o
 * @param recurrence
 * @param isBlank
 */
export const removeEmptyProp = (o, { recurrence = true, isBlank = false } = { recurrence: true, isBlank: false }) => {
  if (o) {
    Reflect.ownKeys(o).forEach(property => {
      const v = o[property]
      const vt = JsType(v)
      switch (vt) {
        case JS_TYPE.Null:
        case JS_TYPE.Undefined:
          Reflect.deleteProperty(o, property)
          break
        case JS_TYPE.String:
          isBlank ?
            v.trim() === '' && Reflect.deleteProperty(o, property) : v === '' && Reflect.deleteProperty(o, property)
          break
        case JS_TYPE.Array:
          v.length === 0 ?
            Reflect.deleteProperty(o, property) : recurrence && v.forEach(item => removeEmptyProp(item))
          break
        case JS_TYPE.Object:
          Reflect.ownKeys(v).length === 0 ?
            Reflect.deleteProperty(o, property) : recurrence && removeEmptyProp(v)
          break
        default:
          break
      }
    })
  }
}

/**
 * Rest参数追加
 * @param primitiveArgs
 * @param targetArgs
 * @returns {any}
 */
export const restArgsAppend = (primitiveArgs, ...targetArgs) => {
  const argsCopy = JSON.parse(JSON.stringify(primitiveArgs))
  argsCopy.push(...targetArgs)
  return argsCopy
}