// src/shared/config/routes.ts
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];
