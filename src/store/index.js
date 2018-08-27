import Vue from 'vue'
import Vuex from 'vuex'
import AuthUser from './modules/authUser'
import login from './modules/login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    AuthUser,
    login
  },
  strict: debug
})
