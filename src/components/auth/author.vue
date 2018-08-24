<template>
    <div v-if="show">
        <login></login>
    </div>
</template>

<script>
import cookie from "js-cookie";
import { mapState } from "vuex";
import config from "../../common/config";
import token from "../../common/token";
import { refreshToken, getLoginMobileCode, loginMobile } from "../../api/api";
import login from "../login";

export default {
  name: "author",

  computed: {
    ...mapState({
      AuthUser: state => state.AuthUser
    })
  },
  components: {
    login
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    // 检测会员有没有登录
    let uri;
    if (sessionStorage.getItem("user_hash_path")) {
      let routerPath = JSON.parse(sessionStorage.getItem("user_hash_path"));
      let index = routerPath.length;
      uri = routerPath[index - 1];
    } else {
      uri = "/recommend";
    };
    if (!this.AuthUser.authorization) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        if (process.env.NODE_ENV === "production") {
          // 跳转到微信授权页面
          if (this.$route.query.code && this.$route.query.state) {
            let params = {
              code: this.$route.query.code,
              state: this.$route.query.state
            };
            this.$store.commit('updateLoadingStatus',{isLoading : true})
            this.$store
              .dispatch("loginWechatRequest", params)
              .then(response => {
                // return this.$router.push({path:uri});
                if (this.$route.query.redirect_url) {
                  location.href = this.$route.query.redirect_url;
                } else {
                  this.$router.push("/recommend");
                };
                this.$store.commit('updateLoadingStatus',{isLoading : false})
              });
          } else {
            this.$store.commit('updateLoadingStatus',{isLoading : true})
            //获取微信签名
            this.$store.dispatch("getWechatAuth");
          }
        } else {
          this.getAuth();
        }
        // console.log('跳转微信授权')
      } else if (
        /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        //移动端
        alert("跳转手机号登陆");
        this.getAuth();
      } else {
        //网页端
        alert("扫码登录/跳转手机号登陆");
        this.getAuth();
      }
    } else {
      this.$store.dispatch("setAuthUser").then(response => {
        this.$router.push(uri);
      });
    }
    this.$store.state.isNavBar = false;
  },
  methods: {
    //通过cookie 刷新 登陆
    refresh() {
      this.$store
        .dispatch("refreshToken")
        .then(response => {
          setTimeout(() => {
            this.goBeforeLoginUrl(); // 页面恢复(进入用户一开始请求的页面)
          }, 2000);
          //return this.$router.push({path:'/recommend'})
        })
        .catch(error => {
          this.$store.dispatch("getWechatAuth");
        });
    },
    getAuth() {
      let nowTime = Math.round(new Date().getTime() / 1000);
      if (
        (this.AuthUser.authorization && token.getRefreshToken()) ||
        (token.getToken() && this.AuthUser.token_expire > nowTime)
      ) {
        alert("登陆成功跳转首页");
        this.$router.push("/recommend");
      } else {
        this.show = true;
        // if (!this.$route.params.mobile) {
        //     this.$router.push({path:'/login'});
        //     return;
        // }
        // alert('手机号'+this.$route.params.mobile);
        // getLoginMobileCode({phone:this.$route.params.mobile,type:0}).then(response => {
        //     let loginP = {
        //         verification_code:"1234",
        //         verification_key:response.data.key
        //     };

        //     loginMobile(loginP).then(response => {
        //         console.log(response.data)
        //         //response.data.push({loginMenu:'mobile'})
        //         this.$store.dispatch('loginSuccess',response.data).then(response => {
        //             //alert('登陆成功跳转首页')
        //             this.$router.push({path:'/recommend'});
        //         })
        //     })
        // })
      }
    }
  }
};
</script>

<style scoped>
</style>