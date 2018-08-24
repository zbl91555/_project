<template>
  <div class = "sharedTwoDimensionalCode">
    <img :src="url" alt="">
    <!-- <div class="frontCover">
      <img :src="info.img" alt="">
    </div>
    <div class="describeInfo">
      <div class="describeTitle"><span>{{info.desc}}</span></div>
      <div class="describenPrice"><span>￥{{info.price}}</span></div>
    </div>
    <div class="sharedImg">
      <div class="twoDimensionalCode">
        <img v-if="url" id="img" :src="url" alt="">
      </div>
      <p>长按识别二维码 把宝贝带回家</p>
    </div> -->
  </div>
</template>

<script>
import { commodityDetailsQRCode } from '../../api/api';
  export default {
    name : 'sharedTwoDimensionalCode',
    data() {
      return {
      url : ''
      }
    },
    mounted() {
      let params = {
        auctionId : this.$route.params.id,
      }
      commodityDetailsQRCode(this.$route.params.id).then(res => {
        console.log(res);
        this.url = res.data.url;
      }).catch(err => {
        console.log(err);
      })
    },
  }
</script>

<style>
#trump_main_unique_1 {
		width : 100%!important;
		height : 100%!important;
	}
.onlyerweima .onlyerweimaimg div:first-child canvas {
	margin-top : 50%;
	transform : translateY(-50%);
}
.sharedTwoDimensionalCode .twoDimensionalCode div {
  width : 100%;
  height : 100%;
}
.sharedTwoDimensionalCode .twoDimensionalCode div canvas{
  width : 100%;
  height : 100%;
}
</style>
<style lang="less" scoped>
	img {
		width : 100%;
	} 
  .sharedTwoDimensionalCode {
    width : 100%;
    height : 100%;
    padding :  30px;
    box-sizing : border-box;
    background : url('../../assets/images/shared.png');
    background-size : 100% 100%;
    position: relative;
    
    .frontCover {
      height : 645px;
      overflow : hidden;
      background : url('../../assets/images/sharedone.png');

      img {
      display : block;
      margin-top : 50%;
      margin-left : 50%;
      transform : translate(-50%,-50%);
      }
    }

    .describeInfo {
      margin : 30px 0;
      font-family: PingFang-SC-Medium;

      .describeTitle {
        font-size : 30px;
        color : #333;
        line-height : 44px;
        margin-bottom : 16px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .describenPrice {
        font-size : 42px;
        color : #9e2026;
      }
    }

    .sharedImg {

      .twoDimensionalCode {
        width : 273px;
        height : 273px;
        margin-left : 50%;
        transform : translateX(-50%);

        img {
          width : 100%;
          height : 100%;
        }
      }

      p {
        font-size : 24px;
        line-height : 44px;
        color : #666;
        text-align : center;
      }
    }
  }
</style>

