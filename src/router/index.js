import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Data from "../views/Data.vue";
import User from "../views/User.vue";
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash 模式：createWebHashHistory，history 模式：createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/data",
      component: Data,
    },
    {
      path: "/user",
      component: User,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/detail',
      compontent: Detail
    }
  ],
});

export default router;