import { toRefs } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useActivate } from '@vs-common/hook/cycle/index.js'
import { PROPS_DETAILS_VIEW } from '../../const/props.js'

export const useConst = {
  key: Symbol('UP_DETAILS_PAGE'),
  enum: {}
}

export const useEmits = [
  'remote:insert'
]

export const useProps = {
  ...PROPS_DETAILS_VIEW,
  remoteQuery: {
    type: Function,
    default: null
  },
  remoteInsert: {
    type: Function,
    default: null
  },
  inline: {
    type: Boolean,
    default: false
  }
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const {
    modelValue,
    remoteQuery,
    viewMode,
    id
  } = toRefs(props)
  
  const {
    status
  } = useActivate({
    modelValue,
    remoteQuery,
    viewMode,
    emits,
    id
  })
  

  const onInsert = async () => {
    ElMessageBox.confirm('确认保存吗')
      .then(() => {
        const { isFetching, then = () => {}, notification = () => {} } = props.remoteInsert(modelValue)
        status.loading.main = isFetching
        then(response => {
          if (response.success) {
            emits('remote:insert')
            notification()
          }
        })
      })
  }
  
  return {
    status,
    onInsert
  }
}