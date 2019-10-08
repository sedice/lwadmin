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


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/index',
      redirect:"/"
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
  ]
})
