import _component from './component/index.js'

export default {
  install: (app, options = { isComponent: false }) => {
    options.isComponent && app.use(_component, options)
  }
}