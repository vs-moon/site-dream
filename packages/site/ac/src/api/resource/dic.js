import { useRequest } from '@/fetch/ns-resource.js'

export const selectMany = params => {
  return useRequest.post({ url: '/dic/selectMany', params })
}

export const selectOne = params => {
  return useRequest.post({ url: '/dic/selectOne', params })
}

export const selectPage = params => {
  return useRequest.post({ url: '/dic/selectPage', params })
}

export const insertOne = params => {
  return useRequest.post({ url: '/dic/insertOne', params })
}

export const updateOne = params => {
  return useRequest.post({ url: '/dic/updateOne', params })
}
export const validOne = params => {
  return useRequest.post({ url: '/dic/validOne', params })
}
export const deleteOne = params => {
  return useRequest.post({ url: '/dic/deleteOne', params })
}