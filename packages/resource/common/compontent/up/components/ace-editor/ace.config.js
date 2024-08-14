import ace, { config } from 'ace-builds'

// Base
import workerBaseUrl from 'ace-builds/src-noconflict/worker-base?url'

// Mode
import modeCssUrl from 'ace-builds/src-noconflict/mode-css?url'
import modeHtmlUrl from 'ace-builds/src-noconflict/mode-html?url'
import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url'
import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url'
import modeYamlUrl from 'ace-builds/src-noconflict/mode-yaml?url'

// Worker
import workerCssUrl from 'ace-builds/src-noconflict/worker-css?url'
import workerHtmlUrl from 'ace-builds/src-noconflict/worker-html?url'
import workerJavascriptUrl from 'ace-builds/src-noconflict/worker-javascript?url'
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'
import workerYamlUrl from 'ace-builds/src-noconflict/worker-yaml?url'

// Theme
import themeTomorrowNightEightiesUrl from 'ace-builds/src-noconflict/theme-tomorrow_night_eighties?url'
import themeGithubUrl from 'ace-builds/src-noconflict/theme-github?url'
import themeGithubDarkUrl from 'ace-builds/src-noconflict/theme-github_dark?url'
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url'
import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url'

// Snippets
import snippetsCssUrl from 'ace-builds/src-noconflict/snippets/css?url'
import snippetsHtmlUrl from 'ace-builds/src-noconflict/snippets/html?url'
import snippetsJsUrl from 'ace-builds/src-noconflict/snippets/javascript?url'
import snippetsJsonUrl from 'ace-builds/src-noconflict/snippets/json?url'
import snippetsYamlUrl from 'ace-builds/src-noconflict/snippets/yaml?url'

// Ext
import 'ace-builds/src-noconflict/ext-language_tools'





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Base
config.setModuleUrl('ace/mode/base', workerBaseUrl)

// Mode
config.setModuleUrl('ace/mode/css', modeCssUrl)
config.setModuleUrl('ace/mode/html', modeHtmlUrl)
config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl)
config.setModuleUrl('ace/mode/json', modeJsonUrl)
config.setModuleUrl('ace/mode/yaml', modeYamlUrl)

// Worker
config.setModuleUrl('ace/mode/css_worker', workerCssUrl)
config.setModuleUrl('ace/mode/html_worker', workerHtmlUrl)
config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl)
config.setModuleUrl('ace/mode/json_worker', workerJsonUrl)
config.setModuleUrl('ace/mode/yaml_worker', workerYamlUrl)

// Theme
config.setModuleUrl('ace/theme/tomorrow_night_eighties', themeTomorrowNightEightiesUrl)
config.setModuleUrl('ace/theme/github', themeGithubUrl)
config.setModuleUrl('ace/theme/github_dark', themeGithubDarkUrl)
config.setModuleUrl('ace/theme/chrome', themeChromeUrl)
config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl)

// Snippets
config.setModuleUrl('ace/snippets/css', snippetsCssUrl)
config.setModuleUrl('ace/snippets/html', snippetsHtmlUrl)
config.setModuleUrl('ace/snippets/javascript', snippetsJsUrl)
config.setModuleUrl('ace/snippets/json', snippetsJsonUrl)
config.setModuleUrl('ace/snippets/yaml', snippetsYamlUrl)

// Options
config.set('autoScrollEditorIntoView', true)
config.set('selectionStyle', 'text')
config.set('maxLines', 21)
config.set('minLines', 7)
config.set('fontSize', 16)
config.set('tabSize', 2)

// Ext
ace.require('ace/ext/language_tools')