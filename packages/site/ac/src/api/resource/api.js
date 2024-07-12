import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = params => {
    return useRequest.post({ url: '/api/selectOne', params })
}

export const selectPage = params => {
    return useRequest.post({ url: '/api/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/api/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/api/updateOne', params })
}
export const validOne = params => {
    return useRequest.post({ url: '/api/validOne', params })
}
export const deleteOne = params => {
    return useRequest.post({ url: '/api/deleteOne', params })
}