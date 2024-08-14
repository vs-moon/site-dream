import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/index.css'
import '@/assets/style/reset.scss'
import DeployApp from '@/App.vue'

import Plugin from '@/plugin'
import Pinia from '@/stores'
import Router from '@/router'

const app = createApp(DeployApp)

app.use(Plugin)
app.use(Pinia)
app.use(Router)
app.use(ElementPlus)

app.mount('#app')
