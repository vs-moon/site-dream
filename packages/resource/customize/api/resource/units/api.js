import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/api/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/api/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/api/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/api/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/api/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/api/deleteOne', params })
}