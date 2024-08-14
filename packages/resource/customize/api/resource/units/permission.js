import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/permission/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/permission/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/permission/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/permission/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/permission/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/permission/deleteOne', params })
}