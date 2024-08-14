import request from '../fetch/index.js'

export const selectMany = params => {
  return request.post({ url: '/dicType/selectMany', params })
}

export const selectOne = params => {
  return request.post({ url: '/dicType/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/dicType/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/dicType/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/dicType/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/dicType/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/dicType/deleteOne', params })
}