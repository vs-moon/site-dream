import { useRequest } from '@/fetch/ns-sso.js'

export const selectOne = (params) => {
    return useRequest.post({ url: '/member/selectOne', params })
}

export const selectPage = (params) => {
    return useRequest.post({ url: '/member/selectPage', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/member/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/member/updateOne', params })
}
export const validOne = params => {
    return useRequest.post({ url: '/member/validOne', params })
}
export const deleteOne = params => {
    return useRequest.post({ url: '/member/deleteOne', params })
}