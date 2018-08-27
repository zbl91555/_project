<template>
    <div>ces </div>
</template>

<script>
import {requestWechatLogin, requestWechatWebLogin} from '../../api/api'

export default {
  // name: "wechat",

  mounted () {
    this.login()
  },
  created () {
    // this.login()
  },
  methods: {
    login () {
      let params = {
        access_token: this.$route.query.access_token,
        expires_in: this.$route.query.expires_in,
        refreshToken: this.$route.query.refreshToken,
        loginMenu: 'wechat'
      }
      this.$store.dispatch('loginSuccess', params).then(response => {
        this.$router.push({path: '/home'})
      })
    }
  }
}
</script>

<style scoped>

</style>
