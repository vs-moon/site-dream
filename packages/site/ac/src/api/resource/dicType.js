import { useRequest } from '@/fetch/ns-resource.js'

export const selectMany = params => {
  return useRequest.post({ url: '/dicType/selectMany', params })
}