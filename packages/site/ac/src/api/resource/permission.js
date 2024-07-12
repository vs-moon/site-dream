import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = params => {
    return useRequest.post({ url: '/permission/selectOne', params })
}

export const selectPage = params => {
    return useRequest.post({ url: '/permission/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/permission/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/permission/updateOne', params })
}
export const validOne = params => {
    return useRequest.post({ url: '/permission/validOne', params })
}
export const deleteOne = params => {
    return useRequest.post({ url: '/permission/deleteOne', params })
}