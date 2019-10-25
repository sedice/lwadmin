import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '/404', component: resolve => (require(["@/views/404"], resolve))},
    { path: '/', redirect: '/index' },
    { path: '/login', name: 'login', component: resolve => (require(["@/views/Login"], resolve)) },
    {
      path: '/index',
      name: 'index',
      component: resolve => (require(["@/views/Index"], resolve)),
      children: [
        { path: '', component:resolve => (require(["@/views/Home"], resolve)) },
        { path: '/home', name: 'home', component: resolve => (require(["@/views/Home"], resolve)) },
        { path: '/shop', name: 'shop', component: resolve => (require(["@/views/Shop"], resolve)) },
        { path: '/goods', name: 'goods', component: resolve => (require(["@/views/Goods"], resolve)) },
        { path: '/frontuser', name: 'frontuser', component: resolve => (require(["@/views/FrontUser"], resolve)) },
        { path: '/backuser', name: 'backuser', component: resolve => (require(["@/views/BackUser"], resolve)) },
        { path: '/store', name: 'store', component: resolve => (require(["@/views/Store"], resolve)) },
        { path: '/replenish', name: 'replenish', component: resolve => (require(["@/views/Replenish"], resolve)) },
        { path: '/lackstore', name: 'lackstore', component: resolve => (require(["@/views/LackStore"], resolve)) },
        { path: '/hotgoods', name: 'hotgoods', component: resolve => (require(["@/views/HotGoods"], resolve)) },
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