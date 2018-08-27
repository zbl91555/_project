const articleDetails = () => import('../../components/home/articleDetails')
const articleDetailsanather = () => import('../../components/home/articleDetailsanather.vue')
const complaint = () => import('../../components/home/complaint.vue')
const shareQrcodes = () => import('../../components/home/shareQrcodes.vue')
const sharedTwoDimensionalCode = () => import('../../components/home/SharedTwoDimensionalCode.vue')

export default [
  {
    path: '/auction/:id',
    component: articleDetails,
    name: 'auction',
    meta: {
      title: '拍品详情'
    }
  },
  {
    path: '/articleDetails/complaint',
    component: complaint,
    name: '投诉'
  },
  {
    path: '/articleDetailsanather',
    component: articleDetailsanather,
    name: '拍品详情',
    meta: {
      title: '拍品详情'
    }
  },
  {
    path: '/shareQrcodes',
    component: shareQrcodes,
    name: '拍品分享'
  },
  {
    path: '/sharedTwoDimensionalCode/:id',
    component: sharedTwoDimensionalCode,
    name: 'sharedTwoDimensionalCode'
  }
]
