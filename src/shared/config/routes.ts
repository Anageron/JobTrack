// src/shared/config/routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/MainPage.vue'),
    meta: { guestOnly: true },
  },
]
