import helper from './helper'

export default {
  beforeRouteEnter (to, from, next) {
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (process.env.NODE_ENV === 'production') {
      if (helper.isIos() && to.path !== global.location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next()
      }
    } else {
      next()
    }
  }
}
