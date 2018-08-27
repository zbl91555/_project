<template>
	<div class="app-containerfoot">
		<ul class="nav">
			<li @click="join(0)" :class="{'actives':navFlag == 0}">
				<span>参拍拍品</span>
			</li>
			<li @click="watch(1)" :class="{'actives':navFlag == 1}">
				<span>围观拍品</span>
			</li>
			<li @click="footerFocus(2)" :class="{'actives':navFlag == 2}">
				<span>关注店铺</span>
			</li>
			<li class="zujiClass" @click="footer(3)" :class="{'actives':navFlag== 3}">
				<i class="iconfont icon-zuji"></i>
				<span>足迹</span>
			</li>
		</ul>
		<router-view v-model="imgFlag"></router-view>
		<img class="img" :src="img" alt="" v-if="imgFlag">
	</div>
</template>
<script>
export default {
  data () {
    return {
      // 导航开关
      navFlag: 0,
      // 参拍拍品信息
      joinList: [],
      // 围观拍品信息
      likeList: [],
      // 关注店铺信息
      focusList: [],
      // 足迹信息
      footers: [],
      // 参拍拍品页数
      nums: [
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        }
      ],
      imgFlag: false, // 无数据时 图片是否展示
      img: require('../../../assets/images/beat.png')
    }
  },
  methods: {
    join (i) {
      this.navFlag = i
      this.imgFlag = false
      this.$router.push('/newFootPrint/join')
    },
    watch (i) {
      this.navFlag = i
      this.imgFlag = false
      this.$router.push('/newFootPrint/watch')
    },
    footerFocus (i) {
      this.navFlag = i
      this.imgFlag = false
      this.$router.push('/newFootPrint/footerFocus')
    },
    footer (i) {
      this.navFlag = i
      this.imgFlag = false
      this.$router.push('/newFootPrint/footer')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.name == 'join') {
      next(vm => {
        vm.join(0)
      })
    }
    if (to.name == 'watch') {
      next(vm => {
        vm.watch(1)
      })
    }
    if (to.name == 'footerFocus') {
      next(vm => {
        vm.footerFocus(2)
      })
    }
    if (to.name == 'footer') {
      next(vm => {
        vm.footer(3)
      })
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
<style lang="less" scoped>
  /*
  * @border-color: 统一边框颜色coupon
  * */

@border-color: #d2d2d2;
.app-containerfoot {
  min-height: 1234px;
  background-color: #ededed;
	overflow: hidden;

	.img {
		width : 507px;
		display : block;
		position: absolute;
		top : 50%;
		left : 50%;
		transform : translate(-50%,-50%);
	}
}

.app-containerfoot .nav {
  height: 90px;
  background-color: #fff;
  margin-bottom: 20px;
  li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 28px;
    padding: 31px 0;
    box-sizing: border-box;
    position: relative;
    i {
      font-size: 44px;
      margin-right: 40%;
    }
  }
  li:nth-child(3) span {
    display: block;
    border-right: 1px solid @border-color;
  }
  li:nth-child(4) span {
    position: absolute;
    right: 50px;
  }
}

.app-containerfoot .list,
.app-containerfoot .focus {
  margin-bottom: 100px;
  float: left;
  width: 100%;
}

.app-containerfoot .list li {
  height: 540px;
  width: 49%;
  float: left;
  background-color: #fff;
  margin-bottom: 10px;
  .list-img {
    width: 100%;
    height: 428px;
    background-size: cover;
    background-position: center;
  }
  .title {
    height: 52px;
    line-height: 52px;
    padding: 0 23px;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }
  .list-info {
    padding: 0 23px;
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    span:nth-of-type(2),
    i {
      float: right;
    }
  }
  &:nth-child(2n) {
    margin-left: 2%;
  }
}

.app-containerfoot .focus {
  padding: 0 18px;
  box-sizing: border-box;
  li {
    height: 260px;
    width: 32%;
    float: left;
    background-color: #fff;
    margin-right: 2%;
    margin-bottom: 20px;
    padding: 0 23px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      right: 0;
      top: 30px;
      margin: auto;
    }
    h3 {
      margin-top: 126px;
      line-height: 70px;
      border-bottom: 1px solid @border-color;
      text-align: center;
    }
    p {
      height: 64px;
      line-height: 64px;
      color: #999;
      text-align: left;
      span {
        display: block;
        height: 30px;
        width: 50px;
        margin: 17px 5px 0 5px;
        background-image: url(../../../assets/images/sellerLevels.png);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: left top;
        float: left;
      }
    }
  }
  li:nth-child(3n) {
    margin-right: 0;
  }
}
.actives,
.actives {
  color: #9e2026;
}
.icon-zuji {
  position: absolute;
  top: 18px;
  left: 20px;
}
.zujiClass {
  position: relative;
}
.icon-huo {
  color: #f15511;
  margin: 0;
}
</style>
