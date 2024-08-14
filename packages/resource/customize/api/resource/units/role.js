import request from '../fetch/index.js'

export const selectOne = params => {
  return request.post({ url: '/role/selectOne', params })
}

export const selectLazy = params => {
  return request.post({ url: '/role/selectLazy', params })
}

export const selectPage = params => {
  return request.post({ url: '/role/selectPage', params })
}

export const insertOne = params => {
  return request.post({ url: '/role/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/role/updateOne', params })
}

export const validOne = params => {
  return request.post({ url: '/role/validOne', params })
}

export const deleteOne = params => {
  return request.post({ url: '/role/deleteOne', params })
}