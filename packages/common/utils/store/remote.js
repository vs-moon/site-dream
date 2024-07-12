import { reactive, readonly } from 'vue'
import { useRegistrar } from './utils.js'
import { REMOTE } from './const.js'

const remoteInstance = reactive({})

export const useRemote = () => {
  return readonly(remoteInstance)
}

export const registerRemote = remote => {
  useRegistrar(remoteInstance, remote, REMOTE)
}