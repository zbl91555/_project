<template>
	<div class="app-container">
		<div class="info">
			<router-link to="/" class="head">
				<div class="head-mian">
					<div class="left">
						<img :src="info.avatar" />
						<h3>{{info.nickname}}</h3>
						<p>头像和介绍每个月可修改一次 </p>
					</div>
					<div class="right">
						设置
						<i class="iconfont icon-right"></i>
					</div>
				</div>
			</router-link>
			<router-link to="/" class="adress">
				退化地址
				<i class="iconfont icon-right"></i>
				<p>
					<span>{{info.name}}</span>
					<span>{{info.tele}}</span>
					<span class="adress-detail">
						{{info.province +'&nbsp;'+info.city+'&nbsp;'+info.country+'&nbsp;'+info.address}}
					</span>
				</p>
			</router-link>
			<ul class="info-list">
				<li class="title">资质信息</li>
				<li>
					<router-link to="/">
						<p>实名认证</p>
						<p>
							<i class="iconfont icon-duihao2 confim" v-if="info.is_company == 1"></i>
							<span v-if="info.is_company == 0">未认证</span>
							<span v-if="info.is_company == 1 && info.is_company_type == 0">已个人认证</span>
							<span v-if="info.is_company == 1 && info.is_company_type == 1">已企业认证</span>
							<i class="iconfont icon-right"></i>
						</p>
					</router-link>
				</li>
				<li>
					<router-link to="/">
						<p>消保金</p>
						<p>
							<span v-if="info.deposit == 0">未缴纳</span>
							<span v-else>已缴纳</span>
							<i class="iconfont icon-right"></i>
						</p>
					</router-link>
				</li>
			</ul>
			<ul class="info-list">
				<li class="title">店铺设置</li>
				<li>
					<router-link to="/">
						<p>买家出价条件设置 </p>
						<p>
							<span v-if="info.sellersetting == 1">已开出</span>
							<span v-else>未开出</span>
							<i class="iconfont icon-right"></i>
						</p>
					</router-link>
				</li>
			</ul>
			<ul class="info-list">
				<li class="title">我的粉丝</li>
				<li>
					<router-link to="/">
						<p>粉丝</p>
						<p>
							<span>{{info.fans}}</span>
							<i class="iconfont icon-right"></i>
						</p>
					</router-link>
				</li>
				<li>
					<router-link to="/">
						<p>屏蔽用户</p>
						<p>
							<span>{{info.pingbi}}</span>
							<i class="iconfont icon-right"></i>
						</p>
					</router-link>
				</li>
			</ul>
			<ul class="info-list">
				<li class="title">高级设置</li>
				<li>
					<a>
						<p>固定“我的”为卖家中心 </p>
						<p @click="setLink()">
							<i class="iconfont icon-kaiguan3" v-show="myLink == 0"></i>
							<i class="iconfont icon-kaiguan4" v-show="myLink == 1"></i>
						</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {getSellerUserInfo} from '../../../api/api'
export default {
  data () {
    return {
      info: {},
      myLink: 0
    }
  },
  methods: {
    getUserInfo: function () {
      let _this = this
      getUserInfo().then(function (res) {
        if (res.code == '200') {
          _this.info = res.data
          _this.myLink = _this.info.mylink
        }
      })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 设置固定“我的”为卖家中心
    setLink: function () {
      let _this = this
      if (_this.myLink == 0) {
        _this.myLink = 1
        console.log(_this.myLink)
      } else {
        _this.myLink = 0
        console.log(_this.myLink)
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* @pad: 30px: 统一边距尺寸
	* */

	@border-color: #d2d2d2;
	@pad: 30px;
	.app-container {
		min-height: 1234px;
		background-color: #ededed;
		padding: 20px 0;
	}

	.iconfont {
		font-size: 12px;
	}

	.info {
		background-color: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		.head {
			display: block;
			height: 168px;
			padding: 28px 0 28px 30px;
			box-sizing: border-box;
			.head-mian {
				overflow: hidden;
				padding: 0 @pad 28px 0;
				border-bottom: 1px solid @border-color;
			}
			.left {
				float: left;
				width: 80%;
				img {
					display: inline-block;
					height: 113px;
					width: 113px;
					margin-right: @pad;
				}
				h3 {
					line-height: 2;
				}
				img,
				h3,
				p {
					float: left;
				}
				h3,
				p {
					width: 70%;
				}
			}
			.right {
				float: right;
				width: 20%;
				height: 100%;
				line-height: 4;
				text-align: right;
				i {
					font-size: 12px;
				}
			}
		}
		.adress {
			display: block;
			line-height: 120px;
			font-size: 30px;
			padding: 0 @pad;
			box-sizing: border-box;
			i {
				float: right;
			}
			span {
				margin-left: 20px;
			}
			i,
			span {
				font-size: 12px;
			}
			p {
				float: right;
				width: 75%;
				line-height: 1.8;
			}
			.adress-detail {
				display: block;
				white-space: nowrap;
				text-overflow: ellipsis;
				word-break: break-all;
				overflow: hidden;
			}
		}
		.info-list {
			background-color: #fff;
			.title {
				height: 75px;
				background-color: #ededed;
				line-height: 75px;
				color: #999;
			}
			li {
				height: 100px;
				padding-left: @pad;
				p:nth-child(1) {
					width: 60%;
					text-align: left;
					float: left;
					font-size: 30px;
				}
				p:nth-child(2) {
					width: 40%;
					text-align: right;
					padding-right: @pad;
					box-sizing: border-box;
					float: right;
					color: #999;
					.confim {
						color: #fd8f01;
					}
					.icon-kaiguan3, .icon-kaiguan4{
						font-size: 80px;
					}
					.icon-kaiguan4{
						color: #d32838;
					}
					.icon-kaiguan3{
						color: #ccc;
					}
				}
				p {
					line-height: 100px;
					border-bottom: 1px solid @border-color;
				}
			}
			li:nth-last-of-type(1) p {
				border-bottom: none;
			}
		}
	}
</style>
