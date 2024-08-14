import { AuthorizeFetch } from '@vs-customize/fetch'

export default Reflect.construct(AuthorizeFetch, [{
    baseUrl: import.meta.env.VITE_API_NS_SSO_ADMIN
}])