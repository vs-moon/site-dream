import _component from './component/index.js'
import _directive from './directive/index.js'
import _icon from './icon/index.js'

export default {
  install: (app, options = { isComponent: false }) => {
    
    options.isComponent && app.use(_component, options)
    
    app.use(_directive, options)
    app.use(_icon, options)
    
    if (Number(app.version.split('.')[0]) < 3) {
      console.warn('This Plugin Requires Vue 3')
    }
  }
}