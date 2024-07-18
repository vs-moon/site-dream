import { RESPONSE_STATUS, useAuthorizationStore, commonResponseFailBy, commonResponseSuccess } from '@vs-common/utils'

export const useConst = {
  key: Symbol('UP_CROSS_STORE_PROVIDE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const authorizationStore = useAuthorizationStore()
  
  window.addEventListener('message', async function (event) {
    if (authorizationStore.enable) {
      if (authorizationStore.cross.indexOf(event.origin) > -1) {
        const { property } = event.data
        const data = property ? authorizationStore[property] : authorizationStore.$state
        event.source.postMessage(commonResponseSuccess({ data }), {
          targetOrigin: event.origin
        })
      } else {
        event.source.postMessage(commonResponseFailBy(RESPONSE_STATUS.DOMAIN_SITE_UNAUTHORIZED), {
          targetOrigin: event.origin
        })
      }
    } else {
      event.source.postMessage(commonResponseFailBy(RESPONSE_STATUS.DOMAIN_ACCOUNT_UNAUTHORIZED), {
        targetOrigin: event.origin
      })
    }
    
  }, false)
}