import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/org/selectOne', params })
}

export const selectLazy = params => {
  return request.post({ url: '/org/selectLazy', params })
}

export const selectPage = params => {
  return request.post({ url: '/org/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/org/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/org/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/org/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/org/deleteOne', params })
}