<template>
	<div class="app-containerBuyset">
		<div v-if="nowPage" class="info">
			<router-link to="/member/setData" class="head">
				<div class="left">
					<img class="avatarClass" :src="info.avatar" />
					<div style="float: left;height:60px">
						<p>{{info.nickname}}</p>
						<p style="color: #999;margin-top:25px;">头像和介绍{{info.is_company?"每月":"每周"}}可修改一次</p>
					</div>
				</div>
				<div class="right">
					设置
					<i class="iconfont icon-right"></i>
				</div>
			</router-link>
			<!-- <router-link :to="{name:'signed',params: {value: info.signature}}" > -->
			<a class="list" @click="signedShow">
				<span>个性签名</span>
				<span>{{info.signature}}</span>
				<i class="iconfont icon-right"></i>
			</a>
			<!-- <router-link :to="'/contacts/'+info.contract" class="list"> -->
			<a class="list" @click="contractShow">
				<span>联系人</span>
				<span>{{info.contract}}</span>
				<i class="iconfont icon-right"></i>
			</a>

			<!-- <router-link :to="'/weChat/'+info.wxaccount" class="list"> -->
			<!-- <a class="list" @click="wxaccountShow">
				<span>微信号码</span>
				<span>{{info.wxaccount}}</span>
				<i class="iconfont icon-right"></i>
			</a> -->

			<router-link to="/verification/1" class="list">
				<span>手机号码</span>
				<span>{{info.mobile}}</span>
				<i class="iconfont icon-right"></i>
			</router-link>

			<router-link :to="'/member/receiveAddress/'+this.type" class="list">

				<span>收货地址</span>
				<span>
					<p class = "receivingAddress" style="padding-top:12px">
						<em>{{address.name}}</em>
						<em>{{address.tele}}</em>
					</p>
					<p class = "receivingAddress">
						<em>{{address.province}}</em>
						<em>{{address.city}}</em>
						<em>{{address.country}}</em>
						<em>{{address.address}}</em>
					</p>
					<!-- <p class = "receivingAddress">{{address.address}}</p> -->
				</span>
				<i class="iconfont icon-right"></i>
			</router-link>
		</div>
		<signed :signes='info.signature' v-if="signe" @getsigneMsg="getSigneMsg"></signed>
		<contacts :contac='info.contract' v-if="contact" @getcontactMsg="getContactMsg"></contacts>
		<wechat :wxacc='info.wxaccount' v-if="chat" @getwechatMsg="getWechatMsg"></wechat>
		<!-- <forgetPsd  v-if="getPsd" @getforgetPsdMsg="getForgetPsdMsg"></forgetPsd> -->
		<!-- <receiveAddress  v-if="addresses" @getaddressMsg="getAddressMsg"></receiveAddress> -->
	</div>
</template>
<script type="text/javascript">
import signed from './signed'
import contacts from './contacts'
import wechat from './weChat'
import receiveAddress from '../receiveAddress'
import {getbasicAllInfo} from '../../../api/api'
import assign from '../../../assets/js/assign.js'// 混入式方法
export default {
  mixins: [assign],
  data () {
    return {
      info: {},
      address: {},
      type: '',
      nowPage: true,
      signe: false, // 个性签名
      contact: false, // 联系人
      chat: false, // 联系人
      getPsd: false, // 联系人
      addresses: false, // 联系人
      mobile: ''
    }
  },
  components: {
    signed,
    contacts,
    wechat
  },
  methods: {
    // 个性签名显示
    signedShow () {
      this.nowPage = false
      this.signe = true
      this.$store.commit('revise', false)
    },
    getSigneMsg (item) {
      this.nowPage = true
      this.signe = false
      this.$store.commit('revise', true)
      this.info.signature = item
    },
    // 联系人
    contractShow () {
      this.nowPage = false
      this.contact = true
      this.$store.commit('revise', false)
    },
    getContactMsg (item) {
      this.nowPage = true
      this.contact = false
      this.$store.commit('revise', true)
      this.info.contract = item
    },
    // 微信号码
    wxaccountShow () {
      this.nowPage = false
      this.chat = true
    },
    getWechatMsg (item) {
      this.nowPage = true
      this.chat = false
      this.info.wxaccount = item
    },
    // 手机号码
    mobileShow () {
      this.nowPage = false
      this.getPsd = true
    },
    getForgetPsdMsg (item) {
      this.nowPage = true
      this.getPsd = false
    },
    // 收货地址
    addressShow () {
      this.nowPage = false
      this.addresses = true
    },
    getAddressMsg (item) {
      this.nowPage = true
      this.addresses = false
    },
    getUserInfo: function () {
      let _this = this
      getbasicAllInfo().then((res) => {
        if (res.code == '200') {
          _this.info = res.data
          _this.mobile = res.data.mobile
          _this.type = res.data.type
          _this.address = res.data.address[0] || {
            name: '',
            tele: '',
            province: '',
            city: '',
            country: ''
          }
          localStorage.setItem('mobile', _this.mobile)
        };
      })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    this.getUserInfo()
  }
  // beforeRouteLeave(to,from,next){

  // }
}
</script>
<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */
	.receivingAddress {
		width : 100%;
		line-height: 0.6rem;
	}
	@border-color: #e5e5e5;
	.app-containerBuyset {
		min-height: 1234px;
		background-color: #f4f4f4;
		padding: 20px 0;
	}

	.iconfont {
		font-size: 24px;
	}

	.app-containerBuyset .info {
		background-color: #fff;
		padding-left: 30px;
		box-sizing: border-box;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		overflow: hidden;
		.head {
			display: block;
			height: 168px;
			padding: 28px 30px 28px 0;
			box-sizing: border-box;
			border-bottom: 1px solid @border-color;
			.left {
				float: left;
				width: 75%;
				img {
					display: inline-block;
					height: 113px;
					width: 113px;
					margin-right: 30px;
				}
				h3 {
					line-height: 2;
					font-size: 30px;
					color: #333;
				}
				img,
				h3{
					float: left;
				}
			}
			.right {
				float: right;
				width: 25%;
				height: 100%;
				line-height: 4;
				text-align: right;
				font-size: 24px;
				color: #666;
			}
		}
		.list {
			display: block;
			width: 100%;
			line-height: 100px;
			font-size: 28px;
			padding-right:30px;
			box-sizing: border-box;
			border-bottom: 1px solid @border-color;
			float: left;
			i {
				float: right;
			}
			span{
				float: left;
			}
			span:nth-child(1) {
				width: 150px;
				color: #333;
			}
			span:nth-child(2) {
				width: 450px;
				overflow: hidden;
			}
			i,
			span {
				display: inline-block;
				font-size: 26px;
				color: #999;
			}
		}
		.list:nth-child(6) {
			border: none;
			line-height: 100px;
			span:nth-child(1){
				line-height: 100px;
			}
			span:nth-child(2){
				line-height: 50px;
			}
			em{
				font-style: normal;
			}
		}
	}
	.avatarClass{
		padding:3px;
		border:2px solid #ececec;
	}
</style>
