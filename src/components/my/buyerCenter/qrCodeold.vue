<template>
	<div class="app-containerqrCode">
		<!-- <div class="box" style="border: 1px solid red;">
		</div> -->

		<div class="mainqrCode">
			<!-- <div class="user-img">
				<img :src="info.avatar"/>
				<p>{{info.nickname}}</p>
				<p>邀请你关注淘拍堂</p>
			</div>
			<div class="qr-code">
				<img :src="info.qrcode"/>
			</div>
			<div class="tip">
				<img src="../../../assets/images/qr-code1.png"/>
			</div> -->
		</div>

		<canvas id="myCanvas" class="canvas">
			Your browser does not support the HTML5 canvas tag
		</canvas>
		<div class="remindqrCode">
			<img src="../../../assets/images/qr-code2.png"/>
		</div>
	</div>
</template>

<script>
import {rewardCode} from '../../../api/api'
export default {
  data () {
    return {
      info: {},
      nickname: '',
      avatar: '',
      qrcode: ''
    }
  },
  methods: {
    rewardCode: function () {
      let _this = this
      rewardCode().then(function (res) {
        _this.info = res.data
        _this.nickname = res.data.nickname
        _this.avatar = '../../../assets/images/qr-code1.png'
        _this.qrcode = '../../../assets/images/qr-code1.png'
        _this.canvascus()
      })
        .catch(function (err) {
          console.log(err)
        })
    },
    canvascus () {
      var c = document.getElementById('myCanvas')
      var ctx = c.getContext('2d')
      ctx.font = '20px Georgia'
      ctx.fillText(this.nickname, 200, 20)
      ctx.fillText('邀请你关注淘拍堂', 200, 60)
      ctx.font = '30px Verdana'

      var imgavatar = new Image()
      imgavatar.src = this.avatar
      var pattern = ctx.createPattern(imgavatar, 'no-repeat')
      ctx.rect(0, 0, 150, 100)
      ctx.fillStyle = pattern
      ctx.fillRect(10, 10, 200, 200)
      ctx.fill()
      ctx.restore()

      var imgCode = new Image()
      imgCode.src = this.qrcode
      var patterncode = ctx.createPattern(imgCode, 'no-repeat')
      ctx.rect(10, 0, 150, 100)
      ctx.fillStyle = patterncode
      ctx.fillRect(50, 50, 100, 100)
      ctx.fill()
      ctx.restore()

      //    // Create gradient
      //    var gradient=ctx.createLinearGradient(0,0,1000,0);
      //    // Fill with gradient
      //    ctx.fillStyle=gradient;
      // ctx.fillRect(100,100,100,400);

      var imgsum = convertCanvasToImage(c)

      $('.mainqrCode').append(imgsum)
      function convertCanvasToImage (canvas) {
        var image = new Image()
        image.src = canvas.toDataURL('image/png')
        return image
      }
    }

  },

  mounted () {
    this.rewardCode()
  }

  // mounted() {
  // 	this.rewardCode();
  // },
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */

	@border-color: #e5e5e5;
	.app-containerqrCode {
		min-height: 1334px;
		background-color: #f4f4f4;
		padding: 77px 77px 0 77px;
		box-sizing: border-box;
		z-index: 2000;
		position: relative;
	}
	.mainqrCode{
		width: 100%;
		height: 847px;
		background-color: #fff;
		border: 1px solid @border-color;
		padding-top: 60px;
		box-sizing: border-box;
		.user-img {
			height: 129px;
			width: 100%;
			img{
				display: block;
				width: 129px;
				height: 129px;
				float: left;
				margin-left: 123px;
			}
			p{
				width: 50%;
				color: #333;
				float: left;
				margin-left: 20px;
			}
			p:nth-of-type(1){
				font-size: 28px;
				line-height: 2.5;
			}
			p:nth-of-type(2){
				font-size: 24px;
			}
		}
		.qr-code{
			width: 100%;
			height: 385px;
			margin-top: 55px;
			padding: 0 108px;
			box-sizing: border-box;
			img{
				width: 385px;
				height: 385px;
			}
		}
		.tip{
			height: 210px;
			width: 100%;
			img{
				width: 100%;
			}
		}
	}
	.remindqrCode{
		width: 100%;
		height: 148px;
		padding: 0 60px;
		box-sizing: border-box;
		margin-top: 50px;
		img{
			height: 100%;}
	}
</style>
