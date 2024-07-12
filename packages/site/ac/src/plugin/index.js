import _config from './config'
import _provide from './provide'
import _directive from './directive'
import _icon from './icon'
import _version from './version'

export default {
  install: (app, _options) => {
    app.use(_config, _options)
    app.use(_provide, _options)
    app.use(_directive, _options)
    app.use(_icon, _options)
    app.use(_version, _options)
  }
}
