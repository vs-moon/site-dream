import { VIEW_MODE } from '@vs-common/utils/const/enum.js'

export const PROPS_DETAILS_VIEW = {
  id: {
    type: String,
    default: '0'
  },
  viewMode: {
    type: String,
    default: '',
    validator: value => {
      return Reflect.ownKeys(VIEW_MODE).includes(value)
    }
  }
}
