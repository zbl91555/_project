import home from './home' // 首页
import category from './category' // 分类
import find from './find'
import auction from './auction'
import order from './order'
import redbag from './redbag'
import my from './my'
import reward from './reward'
import shop from './shop'
import publish from './publish'
import im from './im'
import payment from './payment'
import saleList from './saleList'
import verify from './verify'
import active from './active'
import auth from './auth'
import common from './common'
import balance from './balance'
import error from './error'
import bail from './bail'
// 重定向,指向了登录组件
let index = {
  path: '/',
  redirect: '/author'
}
export default [
  index,
  ...home,
  ...category,
  ...find,
  ...auction,
  ...order,
  ...redbag,
  ...my,
  ...reward,
  ...shop,
  ...publish,
  ...im,
  ...payment,
  ...saleList,
  ...verify,
  ...active,
  ...auth,
  ...common,
  ...balance,
  ...bail,
  ...error

]
