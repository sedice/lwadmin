import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import Shop from './views/Shop'
import Goods from './views/Goods'
import FrontUser from './views/FrontUser'
import BackUser from './views/BackUser'
import Store from './views/Store'
import LackStore from './views/LackStore'
import Replenish from './views/Replenish'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: Nofind },
    { path: '/', redirect: '/index' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/shop', name: 'shop', component: Shop },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/frontuser', name: 'frontuser', component: FrontUser },
        { path: '/backuser', name: 'backuser', component: BackUser },
        { path: '/store', name: 'store', component: Store },
        { path: '/lackstore', name: 'lackstore', component: LackStore },
        { path: '/replenish', name: 'replenish', component: Replenish },
      ]
    },
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;