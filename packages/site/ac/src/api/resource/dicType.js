import { useRequest } from '@/fetch/ns-resource.js'

export const selectMany = params => {
  return useRequest.post({ url: '/dicType/selectMany', params })
}

export const selectOne = params => {
  return useRequest.post({ url: '/dicType/selectOne', params })
}

export const selectPage = params => {
  return useRequest.post({ url: '/dicType/selectPage', params })
}

export const insertOne = params => {
  return useRequest.post({ url: '/dicType/insertOne', params })
}

export const updateOne = params => {
  return useRequest.post({ url: '/dicType/updateOne', params })
}
export const validOne = params => {
  return useRequest.post({ url: '/dicType/validOne', params })
}
export const deleteOne = params => {
  return useRequest.post({ url: '/dicType/deleteOne', params })
}