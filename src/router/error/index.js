const auctionErr = () => import('../../components/home/auctionErr')
// Error
const error_503 = () => import('../../components/error/503.vue')
const errorPage = () => import('../../components/error/errorPage.vue')

export default [
  // 503错误页面
  {
    name: '503Error',
    path: '/503Error',
    component: error_503,
    meta: {
      title: '系统维护中...'
    }
  },
  {
    path: '/auctionErr',
    component: auctionErr,
    name: 'auctionErr'
  },
  {
    name: 'errorPage',
    path: '/errorPage',
    component: errorPage,
    meta: {
      title: '错误'
    }
  }
]
