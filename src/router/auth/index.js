const authWechat = () => import('../../components/auth/wechat')
const author = () => import('../../components/auth/author')
const countriesRegion = () => import('../../components/countriesRegion.vue')
// 修改身份信息
const modifyId = () => import('../../components/my/buyerCenter/modifyId')
const login = () => import('../../components/login')

export default [
  // 登陆部分
  {
    path: '/login',
    component: login,
    name: '登陆',
    meta: {
      title: '登陆'
    },
    children: [{
      path: 'countriesRegion',
      component: countriesRegion,
      name: '国家地区'
    }]
  },
  {
    path: '/authWechat',
    component: authWechat,
    name: '微信回调地址',
    meta: {}
  },
  {
    path: '/author',
    component: author,
    name: 'author',
    meta: {}
  }
]
