import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    meta: { requiresAuth: true },
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: "/",
    redirect: '/login',
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/Login/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})