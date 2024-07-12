import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = params => {
    return useRequest.post({ url: '/org/selectOne', params })
}

export const selectPage = params => {
    return useRequest.post({ url: '/org/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/org/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/org/updateOne', params })
}
export const validOne = params => {
    return useRequest.post({ url: '/org/validOne', params })
}
export const deleteOne = params => {
    return useRequest.post({ url: '/org/deleteOne', params })
}