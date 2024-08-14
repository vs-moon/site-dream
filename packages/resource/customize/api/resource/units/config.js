import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/config/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/config/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/config/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/config/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/config/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/config/deleteOne', params })
}