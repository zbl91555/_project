import home from './home' // 首页
import category from './category' // 分类
import find from './find' // 发现
import auction from './auction' // 商品相关详情
import order from './order'// 订单（买家/卖家）
import redbag from './redbag'// 红包功能
import my from './my'// 个人中心（买家中心/卖家中心）
import reward from './reward'// 推广有礼
import shop from './shop'// 店铺首页面
import publish from './publish'// 发布相关
import im from './im'// 私信
import payment from './payment'// 支付相关
import saleList from './saleList'// 拍品管理
import verify from './verify'// 实名认证
import active from './active'// 活动相关
import auth from './auth'// 登陆相关
import common from './common'// 公共组件
import balance from './balance'// 余额钱包
import error from './error'// 错误组件
import bail from './bail'// 消费保证金
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
