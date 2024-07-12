import usePinia from '@vs-common/utils/store/index.js'
import { REMOTE } from '@vs-common/utils/store/const.js'

import { selectMany as remoteDic } from '@/api/resource/dic.js'
import { selectMany as remoteDicType } from '@/api/resource/dicType.js'
import { login, logout, profile, route } from '@/api/sso/authorization.js'

const module = import.meta.glob('@/stores/unit/**/*.js', { import: 'default', eager: true })

export default {
  install: app => {
    app.use(usePinia, {
      module,
      remote: {
        [REMOTE.dic]: remoteDic,
        [REMOTE.dicType]: remoteDicType,
        [REMOTE.login]: login,
        [REMOTE.logout]: logout,
        [REMOTE.profile]: profile,
        [REMOTE.route]: route
      }
    })
  }
}