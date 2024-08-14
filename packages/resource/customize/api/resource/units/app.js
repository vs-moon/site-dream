import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/app/selectOne', params })
}

export const selectPage = params => {
  return request.post({ url: '/app/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/app/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/app/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/app/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/app/deleteOne', params })
}