import { reactive, readonly } from 'vue'
import { TypeUtils } from '@vs-common/utils'

export const REMOTE = {
  dic: 'dic',
  dicType: 'dicType',
  login: 'login',
  logout: 'logout',
  profile: 'profile',
  route: 'route'
}

const remoteInstance = reactive({})

export const useRegistrar = (mountPoint, args, propertyMap = {}, merge = false) => {
  if (TypeUtils.isObject(args)) {
    for (const argsKey in args) {
      const propertyMapKeys = Object.values(propertyMap)
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

export const useRemote = () => {
  return readonly(remoteInstance)
}

export const registerRemote = remote => {
  useRegistrar(remoteInstance, remote, REMOTE)
}