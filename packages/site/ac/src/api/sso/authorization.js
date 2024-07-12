import { useRequest } from '@/fetch/ns-sso.js'

export const login = (params) => {
    return useRequest.post({ url: '/login', params })
}

export const logout = () => {
    return useRequest.get({ url: '/logout' })
}

export const profile = () => {
    return useRequest.get({ url: '/profile' })
}

export const route = () => {
    return useRequest.get({ url: '/route' })
}