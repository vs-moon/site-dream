import { useStorePlugin, REMOTE } from '@vs-customize/plugin'
import { dicFetch, dicTypeFetch } from '@vs-customize/api-resource'
import { authorizeFetch } from '@vs-customize/api-ac-client'

const module = import.meta.glob('@/stores/units/**/*.js', { import: 'default', eager: true })

export default {
  install: app => {
    app.use(useStorePlugin, {
      module,
      remote: {
        [REMOTE.dic]: dicFetch.selectMany,
        [REMOTE.dicType]: dicTypeFetch.selectMany,
        [REMOTE.login]: authorizeFetch.login,
        [REMOTE.logout]: authorizeFetch.logout,
        [REMOTE.profile]: authorizeFetch.profile,
        [REMOTE.route]: authorizeFetch.route
      }
    })
  }
}