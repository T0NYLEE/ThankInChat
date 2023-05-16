import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'
import { AdminLayout } from '@/views/admin/layout'
import humans from '@/views/admin/humans.vue'
import orders from '@/views/admin/orders.vue'
import items from '@/views/admin/items.vue'
import templates from '@/views/admin/templates.vue'
import bots from '@/views/admin/bots.vue'
import {ss} from '@/utils/storage'
import {fetchPost} from '@/api'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
	{path:'/',component:AdminLayout,children:[
		{path:'/humans',component:humans},
		{path:'/orders',component:orders},
		{path:'/items',component:items},
		{path:'/templates',component:templates},
		{path:'/bots',component:bots},],
    beforeEnter: async (to, from) => {
      const LOCAL_NAME = 'userStorage'
      const localSetting:any= ss.get(LOCAL_NAME)
      if(localSetting){
        const openid=localSetting.userInfo.openid;
        return await fetchPost('HumanRole',{openid:openid});
      }
      return false
    },
	},
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
