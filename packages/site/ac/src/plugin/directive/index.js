import * as _files from './listQueue'

export default {
  install: (app, _options) => {
    for (const [ name, option ] of Object.entries(_files)) {
      app.directive(name.toLocaleLowerCase(), option)
    }
  }
}
