import request from '../fetch/index.js'

export const selectOne = id => {
  return request.post({ url: '/route/selectOne', params: id })
}

export const selectPage = params => {
  return request.post({ url: '/route/selectPage', params })
}

export const selectLazy = params => {
  return request.post({ url: '/route/selectLazy', params })
}

export const insertOne = params => {
  return request.post({ url: '/route/insertOne', params })
}

export const updateOne = params => {
  return request.post({ url: '/route/updateOne', params })
}

export const validOne = ({ by, to }) => {
  return request.post({ url: '/route/validOne', params: { by, to } })
}

export const deleteOne = id => {
  return request.post({ url: '/route/deleteOne', params: id })
}