import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = params => {
    return useRequest.post({ url: '/menu/selectOne', params })
}

export const selectPage = params => {
    return useRequest.post({ url: '/source/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/menu/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/menu/updateOne', params })
}
export const validOne = params => {
    return useRequest.post({ url: '/menu/validOne', params })
}
export const deleteOne = params => {
    return useRequest.post({ url: '/menu/deleteOne', params })
}