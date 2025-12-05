// src/app/providers/app-router.ts
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/shared/config/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
