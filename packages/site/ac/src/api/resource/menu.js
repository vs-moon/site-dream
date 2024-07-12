import { useRequest } from '@/fetch/ns-resource.js'

export const selectOne = id => {
    return useRequest.post({ url: '/menu/selectOne', params: id })
}

export const selectPage = params => {
    return useRequest.post({ url: '/menu/selectPage', params })
}

export const selectMany = params => {
    return useRequest.post({ url: '/menu/selectMany', params })
}

export const insertOne = params => {
    return useRequest.post({ url: '/menu/insertOne', params })
}

export const updateOne = params => {
    return useRequest.post({ url: '/menu/updateOne', params })
}
export const validOne = ({ by, to }) => {
    return useRequest.post({ url: '/menu/validOne', params: { by, to } })
}
export const validMany = ({ by, to }) => {
    return useRequest.post({ url: '/menu/validMany', params: { by, to } })
}
export const deleteOne = id => {
    return useRequest.post({ url: '/menu/deleteOne', params: id })
}