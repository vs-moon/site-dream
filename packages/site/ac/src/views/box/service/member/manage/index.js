import { reactive, ref } from 'vue'
import { selectPage } from '@/api/sso/member.js'

export const useConst = {
  key: Symbol('SERVICE_MEMBER_MANAGE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const status = reactive({
    drawer: false,
    loading: false
  })

  const query = reactive({
    username: ''
  })

  const list = ref([])

  const onSelectPage = () => {
    const { isFetching, then } = selectPage(query)
    status.loading = isFetching
    then(response => {
      list.value = response.data.list
    })
  }

  return {
    status,
    query,
    list,
    onSelectPage
  }
}