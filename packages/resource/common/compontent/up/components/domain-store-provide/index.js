import { useEventListener } from '@vueuse/core'
import { RESPONSE_STATUS } from '@vs-common/const'
import { commonResponseFailBy, commonResponseSuccess } from '@vs-common/utils'

const eventResponse = 'event:response'

export const useOptions = Object.freeze({
  key: Symbol('UP_DOMAIN_STORE_PROVIDE'),
  confine: {},
  emits: [
    eventResponse
  ],
  props: {
    status: {
      type: Boolean,
      default: false
    },
    crossSite: {
      type: String,
      default: ''
    },
    storeName: {
      type: String,
      default: ''
    }
  }
})

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  useEventListener(window, 'message', event => {
    let data
    if (props.status) {
      if (props.crossSite.indexOf(event.origin) > -1) {
        data = commonResponseSuccess({ data: JSON.parse(localStorage.getItem(props.storeName)) })
        event.source.postMessage(data, {
          targetOrigin: event.origin
        })
      } else {
        data = commonResponseFailBy(RESPONSE_STATUS.DOMAIN_SITE_UNAUTHORIZED)
        event.source.postMessage(data, {
          targetOrigin: event.origin
        })
      }
    } else {
      data = commonResponseFailBy(RESPONSE_STATUS.DOMAIN_ACCOUNT_UNAUTHORIZED)
      event.source.postMessage(data, {
        targetOrigin: event.origin
      })
    }
    
    emits(eventResponse, data)
  })
}