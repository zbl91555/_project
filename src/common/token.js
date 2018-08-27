import Cookie from 'js-cookie'

export default {

  setToken (token) {
    window.localStorage.setItem('token', token)
  },

  removeToken () {
    window.localStorage.removeItem('token')
  },

  getToken () {
    return window.localStorage.getItem('token')
  },

  setRefreshToken (refreshToken, expires = 29) {
    // 后端默认给30天 前端-1天
    process.env.NODE_ENV === 'production'
      ? Cookie.set('auth_id', refreshToken, { expires: expires, domain: '.taopaitang.com' })
      : Cookie.set('auth_id', refreshToken, { expires: expires })
  },

  getRefreshToken () {
    return Cookie.get('auth_id')
  },

  removeRefreshToken () {
    Cookie.remove('auth_id')
  },

  getLocalItem (key) {
    return window.localStorage.getItem(key)
  },

  setLocalItem (key, value) {
    window.localStorage.setItem(key, value)
  },

  removeCookie (key) {
    return Cookie.remove(key)
  }
}
