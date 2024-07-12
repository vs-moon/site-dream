import { reactive, readonly } from 'vue'
import { useRegistrar } from './utils.js'
import { PROPERTY } from './const.js'

const propertyInstance = reactive({
  ...PROPERTY
})

export const useProperty = () => {
  return readonly(propertyInstance)
}

export const registerProperty = property => {
  useRegistrar(propertyInstance, property, PROPERTY, true)
}