<template>
	<div class="app-containernewP">
		<!--<h1>新品开拍</h1>-->
		<ul class="mainnewP">
			<li class="list">
				<div class="head">
					<img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0e5pBy1yZ9TCakfTEg3aKjTicmB6HgwUdebzZNibU1ULLiaehexicO4OaSjWMZwTjXfib7PQn4G41arw/132"/>
					<div class="head-title">
						<span></span>
						<span>东宫蜘蛛</span>
						<p>15分钟前</p>
					</div>
					<div class="go">
						<router-link to="/">进店</router-link>
					</div>
				</div>
				<div class="banner">
					<p>
						<span>浏览：222</span>
						<span>围观：222</span>
						<span>出价：222</span>
					</p>
				</div>
				<div class="list-detail">
					<p>东宫蜘蛛的新品开拍了</p>
					<p>
						<router-link :to="{name: 'auction', params: {id:1}}">
							<span class="startP">￥33333</span>
							<i class="iconfont icon-right"></i>
							<span>去出价</span>
						</router-link>
					</p>
				</div>
			</li>
			<li class="list">
				<div class="head">
					<img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0e5pBy1yZ9TCakfTEg3aKjTicmB6HgwUdebzZNibU1ULLiaehexicO4OaSjWMZwTjXfib7PQn4G41arw/132"/>
					<div class="head-title">
						<span></span>
						<span>东宫蜘蛛</span>
						<p>15分钟前</p>
					</div>
					<div class="go">
						<router-link to="/">进店</router-link>
					</div>
				</div>
				<div class="banner">
					<p>
						<span>浏览：222</span>
						<span>围观：222</span>
						<span>出价：222</span>
					</p>
				</div>
				<div class="list-detail">
					<p>东宫蜘蛛的新品开拍了</p>
					<p>
						<router-link to="/">
							<span>￥33333</span>
							<i class="iconfont icon-right"></i>
							<span>去出价</span>
						</router-link>
					</p>
				</div>
			</li>
			<li class="list">
				<div class="head">
					<img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0e5pBy1yZ9TCakfTEg3aKjTicmB6HgwUdebzZNibU1ULLiaehexicO4OaSjWMZwTjXfib7PQn4G41arw/132"/>
					<div class="head-title">
						<span></span>
						<span>东宫蜘蛛</span>
						<p>15分钟前</p>
					</div>
					<div class="go">
						<router-link to="/">进店</router-link>
					</div>
				</div>
				<div class="banner">
					<p>
						<span>浏览：222</span>
						<span>围观：222</span>
						<span>出价：222</span>
					</p>
				</div>
				<div class="list-detail">
					<p>东宫蜘蛛的新品开拍了</p>
					<p>
						<router-link to="/">
							<span>￥33333</span>
							<i class="iconfont icon-right"></i>
							<span>去出价</span>
						</router-link>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色coupon
	* @pad: 统一边距
	* */

	@border-color: #d2d2d2;
	@pad: 20px;
	.app-containernewP {
		min-height: 1234px;
		background-color: #ededed;
	}

	.app-containernewP .mainnewP{
		width: 100%;
		margin-bottom: 100px;
		overflow: hidden;
		.list{
			width: 100%;
			height: 615px;
			border-bottom: 1px solid @border-color;
			border-top: 1px solid @border-color;
			background-color: #fff;
			margin-bottom: 10px;
			padding: 25px @pad;
			box-sizing: border-box;
			.head{
				height: 70px;
				width: 100%;
				margin-bottom: 25px;
				img{
					display: block;
					float: left;
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
				.head-title{
					float: left;
					width: 70%;
					line-height: 35px;
					margin-left: @pad;
					span:nth-child(2){
						font-size: 28px;
					}
					p{
						color: #999;
					}
					span:nth-child(1){
						float: left;
						margin-top: 5px;
						margin-right: 5px;
						display: inline-block;
						width: 52px;
						height: 27px;
						background-image: url(../../../assets/images/sellerLevels.png);
						background-position: left top;
						background-size: 100%;
						font-size: 28px;
					}
				}
				.go{
					width: 92px;
					height: 44px;
					text-align: center;
					margin-top: 10px;
					float: right;
					border: 2px solid @border-color;
					line-height: 44px;
					border-radius: 5px;
					a{
						display: block;
						width: 100%;
						height: 100%;
						color: #666;
					}
				}
			}
			.banner{
				height: 346px;
				width: 100%;
				background-image: url(../../../assets/images/newPro.png);
				padding-top: 300px;
				box-sizing: border-box;
				p{
					height: 24px;
					padding: 0 @pad;
					line-height: 24px;
					color: #fff;
					span:nth-child(1){
						margin-right: 50px;
					}
					span:nth-last-of-type(1){
						float: right;
					}
				}
			}
			.list-detail{
				width: 100%;
				height: 125px;
				p:nth-child(1){
					line-height: 2.5;
				}
				p{
					font-size: 28px;
					span:nth-child(1){
						color: #9e2026;
					}
					i,
					span:nth-last-of-type(1){
						float: right;
						color: #f15511;
					}
					i{
						line-height: 1.8;
						font-size: 24px;
					}
				}
			}
		}
		.list:nth-child(1){
			border-top: none;
		}
	}
	.icon-right{
		margin: 0
	}
	.startP{
		font-size: 30px;
	}
</style>
