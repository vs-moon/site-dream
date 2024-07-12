import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = params => {
    return useRequest.post({ url: '/role/selectOne', params })
}

export const selectMany = params => {
    return useRequest.post({ url: '/role/selectMany', params })
}

export const selectPage = params => {
    return useRequest.post({ url: '/role/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/role/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/role/updateOne', params })
}

export const validOne = params => {
    return useRequest.post({ url: '/role/validOne', params })
}

export const deleteOne = params => {
    return useRequest.post({ url: '/role/deleteOne', params })
}