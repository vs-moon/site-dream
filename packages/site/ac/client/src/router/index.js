import { createRouter, createWebHistory } from 'vue-router'
import { useRouterPlugin, ROUTE } from '@vs-customize/plugin'

export const router = createRouter({
  history: createWebHistory(`${import.meta.env.BASE_URL}client/box`),
  strict: true,
  routes: [
    {
      ...ROUTE.entrance,
      meta: {
        lang: [ 'zh-cn' ],
        title: '登录'
      },
      component: () => import('../views/login/index.vue')
    },
    {
      ...ROUTE.root,
      meta: {
        lang: [ 'zh-cn' ],
        title: '管理'
      },
      component: () => import('@/views/box/index.vue'),
      children: [
        {
          path: '/:error(.*)',
          name: 'error',
          meta: {
            lang: [ 'zh-cn' ],
            title: '异常'
          },
          component: () => import('../views/error/index.vue')
        }
      ]
    }
  ]
})

export default {
  install (app, _options) {
    app.use(useRouterPlugin, { router })
  }
}