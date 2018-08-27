<template>
	<div class="finddemo">
		<!-- 轮播图 -->
		<div @click="recruit">
			<swiper @on-index-change="changeS" :list="demoList" auto style="width:100%;margin:0 auto;" dots-class="custom-bottom" dots-position="center" :aspect-ratio="300/800" height="180px" >
			</swiper>
		</div>
		<router-link to="/selective">
			<div class="newuser">
			</div>
		</router-link>
		<router-link to="/thanka">
			<div class="newuser tanka">
			</div>
		</router-link>
	</div>
</template>
<script>
import {Swiper} from 'vux'
const imgList = [
  require('../../assets/images/zhaomu.png'),
  require('../../assets/images/tuijian.png')
]

const demoList = imgList.map((one, index) => ({
  url: '#:',
  img: one
}))
export default {
  components: {
    Swiper
  },
  data () {
    return {
      demoList: demoList,
      currentIndex: '0'
    }
  },
  methods: {
    changeS (i) {
      this.currentIndex = i
    },
    onSwiperItemIndexChange (index) {
    //   console.log('demo item change', index)
    },
    // 商家招募
    recruit () {
      console.log(this.currentIndex)
      if (this.currentIndex == '0') {
        this.$router.push('/merchantRecruit')
      }
      if (this.currentIndex == '1') {
        this.$router.push('/buyerCenter/PromotionGift')
      }
    }
  }
}
</script>
<style>
	.vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot{
		width:10px !important;
		height:10px !important;
		border-radius:5px !important;
	}
	.finddemo .active{
		background-color:#9e2026 !important;
	}
	.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
		display: none
	}
</style>
<style scoped>
	.finddemo{
		background: #f4f4f4
	}
	.finddemo .newuser{
		height:180px;
		width: 100%;
		margin-top: 20px;
		background: url('../../assets/images/newfind.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		box-shadow:0 5px #e9e5dc;
	}
.finddemo .tanka {
  background : url('../../assets/activityimages/tangkaArtExhibition.png') center;
}
</style>
