import request from '../fetch/index.js'

export const selectOne = (params) => {
    return request.post({ url: '/user/selectOne', params })
}

export const selectPage = (params) => {
    return request.post({ url: '/user/selectPage', params })
}

export const insertOne = params => {
    return request.post({ url: '/user/insertOne', params })
}

export const updateOne = params => {
    return request.post({ url: '/user/updateOne', params })
}

export const validOne = params => {
    return request.post({ url: '/user/validOne', params })
}

export const deleteOne = params => {
    return request.post({ url: '/user/deleteOne', params })
}