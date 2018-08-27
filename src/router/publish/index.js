const upload = () => import('../../components/home/upload.vue')
const nextUpload = () => import('../../components/home/nextUpload')
const biddingAgreement = () => import('../../components/home/biddingAgreement.vue')

export default [
  {
    path: '/upload/:id?',
    component: upload,
    name: '发布',
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'biddingAgreement',
      component: biddingAgreement,
      name: '竞拍协议'
    }]
  },
  {
    path: '/nextUpload/:id/:active?',
    component: nextUpload,
    name: 'nextUpload'
  }
]
