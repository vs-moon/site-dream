import './ace.config.js'
import UpAceEditorCss from './ace-editor-css/index.vue'
import UpAceEditorHtml from './ace-editor-html/index.vue'
import UpAceEditorJs from './ace-editor-js/index.vue'
import UpAceEditorJson from './ace-editor-json/index.vue'
import UpAceEditorYaml from './ace-editor-yaml/index.vue'

export const useOptions = {
  key: Symbol('UP_ACE_EDITOR'),
  confine: {
    defaultOptions: {
      useWorker: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    },
    langOptions: [
      {
        value: 'text',
        label: 'Text',
        component: null
      },
      {
        value: 'css',
        label: 'Css',
        component: UpAceEditorCss
      },
      {
        value: 'html',
        label: 'Html',
        component: UpAceEditorHtml
      },
      {
        value: 'javascript',
        label: 'JS',
        component: UpAceEditorJs
      },
      {
        value: 'json',
        label: 'Json',
        component: UpAceEditorJson
      },
      {
        value: 'yaml',
        label: 'Yaml',
        component: UpAceEditorYaml
      }
    ],
    themeOptions: [
      {
        value: 'tomorrow_night_eighties',
        label: 'TomorrowNight'
      },
      {
        value: 'github',
        label: 'Github'
      },
      {
        value: 'github_dark',
        label: 'GithubDark'
      },
      {
        value: 'chrome',
        label: 'Chrome'
      },
      {
        value: 'monokai',
        label: 'Monokai'
      }
    ]
  },
  emits: [],
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: null
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {}
}