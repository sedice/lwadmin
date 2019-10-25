import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import NewStore from '@/views/store/NewStore'
import HistoryStore from '@/views/store/HistoryStore'
import HistoryStoreDetail from '@/views/store/HistoryStoreDetail'
import NewLackStore from '@/views/lack_store/NewLackStore'
import HistoryLackStore from '@/views/lack_store/HistoryLackStore'
import HistoryLackStoreDetail from '@/views/lack_store/HistoryLackStoreDetail'
import NewReplenish from '@/views/replenish/NewReplenish'
import HistoryReplenish from '@/views/replenish/HistoryReplenish'
import HistoryReplenishDetail from '@/views/replenish/HistoryReplenishDetail'

import NewHotGoodsStore from '@/views/hotgoods_store/NewHotGoodsStore'
import HistoryHotGoodsStore from '@/views/hotgoods_store/HistoryHotGoodsStore'
import HistoryHotGoodsStoreDetail from '@/views/hotgoods_store/HistoryHotGoodsStoreDetail'


import UserInfo from '@/views/userinfo/UserInfo'
import Nofind from '@/views/Nofind'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '*', name: '/404', component: Nofind },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/index',
      redirect: "/"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/new_store',
      name: 'NewStore',
      component: NewStore,
    },
    {
      path: '/history_store',
      name: 'HistoryStore',
      component: HistoryStore,
    },
    {
      path: '/history_store/:serchId',
      name: 'HistoryStoreDetail',
      component: HistoryStoreDetail,
    },
    {
      path: '/new_lack_store',
      name: 'NewLackStore',
      component: NewLackStore,
    },
    {
      path: '/history_lack_store',
      name: 'HistoryLackStore',
      component: HistoryLackStore,
    },
    {
      path: '/history_lack_store/:serchId',
      name: 'HistoryLackStoreDetail',
      component: HistoryLackStoreDetail,
    },
    {
      path: '/new_replenish',
      name: 'NewReplenish',
      component: NewReplenish,
    },
    {
      path: '/history_replenish',
      name: 'HistoryReplenish',
      component: HistoryReplenish,
    },
    {
      path: '/history_replenish/:serchId',
      name: 'HistoryReplenishDetail',
      component: HistoryReplenishDetail,
    },
    {
      path: '/new_hotgoodsstore',
      name: 'NewHotGoodsStore',
      component: NewHotGoodsStore,
    },
    {
      path: '/history_hotgoodsstore',
      name: 'HistoryHotGoodsStore',
      component: HistoryHotGoodsStore,
    },
    {
      path: '/history_hotgoodsstore/:serchId',
      name: 'HistoryHotGoodsStoreDetail',
      component: HistoryHotGoodsStoreDetail,
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
export default router
