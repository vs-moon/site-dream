import request from '../fetch/index.js'

export const login = (params) => {
    return request.post({ url: '/login', params })
}

export const logout = () => {
    return request.get({ url: '/logout' })
}

export const profile = () => {
    return request.get({ url: '/profile' })
}

export const route = () => {
    return request.get({ url: '/route' })
}