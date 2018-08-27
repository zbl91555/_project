const storeHome = () => import('../../components/home/storeHome.vue')
const storeIntroduced = () => import('../../components/home/storeIntroduced.vue')

export default [
  {
    path: '/storeHome/:user_id',
    component: storeHome,
    name: '店铺首页',
    meta: {
      title: '店铺首页'
    }
  },
  {
    path: '/storeIntroduced/:seller_id?',
    component: storeIntroduced,
    name: '卖家信息',
    meta: {
      title: '店铺信息'
    }
  }
]
