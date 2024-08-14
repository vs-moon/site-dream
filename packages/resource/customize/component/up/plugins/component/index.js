import * as components from '../../components/index.js'

/**
 * 组件注册
 */
export default {
  install(app, _options) {
    for (const [ key, component ] of Object.entries(components)) {
      app.component(key, component)
    }
  }
}