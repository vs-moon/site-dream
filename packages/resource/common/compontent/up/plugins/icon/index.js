import { inject } from 'vue'
import * as icons from '@element-plus/icons-vue'

export const UP_ICON_NAMES_KEY = Symbol('UP_ICON_NAMES')

export const useIconNames = () => {
  return inject(UP_ICON_NAMES_KEY)
}

/**
 * 图标组件注册
 */
export default {
  install(app, _options) {
    const iconNames = []
    for (const [ key, component ] of Object.entries(icons)) {
      app.component(key, component)
      iconNames.push(key)
    }
    app.provide(UP_ICON_NAMES_KEY, iconNames)
  }
}
