<template>
	<div class="errrorPage">
		<div><img class="imgClass" src="../../assets/images/errorPage.png" alt=""></div>
    <div class="text">{{text}}</div>
    <p class="time" v-if="status != 40001">封店时间:{{time}}</p>
    <div @click="backToHome" v-if="status != 40001">返回首页</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      status: '',
      text: '抱歉！您访问的页面失联了...',
      time: ''
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/home')
    }
  },
  beforeRouteLeave (to, from, next) {
    let nav = document.querySelector('.app-nav')
    nav.style.display = 'block'
    next()
  },
  created () {
    this.status = this.$route.query.type
    if (this.status == 40001) {
      this.text = this.$route.query.msg
      this.$nextTick(_ => {
        let nav = document.querySelector('.app-nav')
        nav.style.display = 'none'
      })
    } else if (this.status == 40002) {
      let errinfo = sessionStorage.getItem('err') && JSON.parse(sessionStorage.getItem('err'))
      this.text = errinfo.message
      this.time = errinfo.data.tips
    }
  }
}
</script>

<style scoped>
.text {
  font-size : 24px;
  color : #999;
  padding : 20px;
}
.time {
  font-size : 20px;
  color : #999;
}
.errrorPage {
  text-align: center;
  padding-top: 290px;
}
.imgClass {
  width: 240px;
}
.errrorPage div:nth-child(3) {
  margin-top: 44px;
  color: #999999;
}
.errrorPage div:nth-child(4) {
  border: 2px solid #a0a0a0;
  padding: 17px 30px;
  width: 170px;
  margin: 85px auto 50px;
  border-radius: 5px;
}
</style>
