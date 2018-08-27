// 发现
const find = () => import('../../components/find/find.vue')
const newPat = () => import('../../components/find/newPat.vue')
const merchantRecruit = () => import('../../components/find/merchantRecruit.vue')

export default [
  // 发现部分
  {
    path: '/find',
    name: '发现',
    component: find,
    meta: {
      title: '发现'
    }
  },
  // {
  //   path: '/find/newPat',
  //   name: '发现',
  //   component: newPat
  // },
  {
    path: '/merchantRecruit',
    name: 'merchantRecruit',
    component: merchantRecruit
  } // 商家招募
]
