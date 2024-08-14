import request from '../fetch/index.js'

export const selectMany = params => {
  return request.post({ url: '/dic/selectMany', params })
}

export const selectOne = params => {
  return request.post({ url: '/dic/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/dic/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/dic/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/dic/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/dic/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/dic/deleteOne', params })
}