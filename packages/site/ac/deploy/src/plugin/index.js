import UpPlugin from '@vs-common/component-up'

export default {
  install: (app, options) => {
    app.use(UpPlugin, options)
  }
}