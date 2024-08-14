import { AUTHORIZATION_HEAD, FetchUtils } from '@vs-common/utils'
import { ROUTE, useAuthorizeStore, useReset, useRouter } from '@vs-customize/plugin'
import { ElNotification } from 'element-plus'

const router = useRouter()

export class AuthorizeFetch extends FetchUtils.VSFetch {
  
  constructor({ baseUrl }) {
    super({ baseUrl })
  }
  
  async onRequestBefore({ options, cancel, url }) {
    
    if (this.authorization) {
      
      const authorizeStore = useAuthorizeStore()
      
      const routine = authorizeStore.routine
      const hibernation = authorizeStore.hibernation
      const remember = authorizeStore.remember
      
      if (routine) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION] = routine
      }
      
      if (hibernation) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION_HIBERNATION] = hibernation
      }
      
      if (remember) {
        options.headers[AUTHORIZATION_HEAD.AUTHORIZATION_REMEMBER] = remember
      }
    }
    
    return super.onRequestBefore({ options, cancel, url })
  }
  
  onResponseAfter({ response, data }) {
    
    if (this.authorization) {
      
      const routine = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION)
      const renewal = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_RENEWAL)
      const cross = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_CROSS)
      const crossSite = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_CROSS_SITE)
      const hibernation = response.headers.get(AUTHORIZATION_HEAD.AUTHORIZATION_HIBERNATION)
      
      const authorizeStore = useAuthorizeStore()
      
      
      if (routine) {
        authorizeStore.routine = routine
        authorizeStore.enable = true
      }
      
      if (renewal) {
        authorizeStore.routine = renewal
      }
      
      if (cross) {
        authorizeStore.cross = cross
      }
      
      if (crossSite) {
        authorizeStore.crossSite = crossSite
      }
      
      if (hibernation) {
        authorizeStore.hibernation = hibernation
      }
    }
    
    return super.onResponseAfter({ response, data })
  }
  
  onCatch({ response, data, error }) {
    
    const { code } = data
    
    if (code === 10011) {
      useReset()
      router.value.push({ path: ROUTE.entrance.path })
    }
    
    return super.onCatch({ response, data, error })
  }
}