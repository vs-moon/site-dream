import { isObject } from '../type/index.js'

export const useRegistrar = (mountPoint, args, propertyMap = {}, merge = false) => {
  if (isObject(args)) {
    for (const argsKey in args) {
      const propertyMapKeys = Reflect.ownKeys(propertyMap)
      if (propertyMapKeys.includes(argsKey)) {
        if (merge) {
          mountPoint[argsKey] = {
            ...propertyMap[argsKey],
            ...args[argsKey]
          }
        } else {
          mountPoint[argsKey] = args[argsKey]
        }
      }
    }
  }
}