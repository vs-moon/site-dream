import * as _icons from '@element-plus/icons-vue'

export default {
  install(app, _options) {
    for (const [ key, component ] of Object.entries(_icons)) {
      app.component(key, component)
    }
  }
}
