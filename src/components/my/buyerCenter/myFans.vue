<template>
	<div class="app-containerFans" ref="myFans">
		<div class="head">
			<div class="user-img">
				<img :src="info.headimgurl" />
			</div>
			<div class="user-info">
				<p>今日推荐：<span>{{info.today}}</span></p>
				<p>推荐总数：<span>{{info.total}}</span></p>
			</div>
		</div>
		<ul class="mainFans">
			<li v-for="(e,index) in infoList" :key="e">
				<div class="fans-img">
					<img :src="e.headimgurl" />
				</div>
				<div class="fans-info" :class="{active: e.guanzhu == true}">
					<span>{{e.nickname}}</span>
					<span v-if="e.guanzhu == false" @click="toAttention(e.userId,index)">+关注</span>
					<span v-if="e.guanzhu == true" @click="cancelAttention(e.userId,index)">取消关注</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import {rewardMember, rewardMemberList, shopFocus, shopCancel} from '../../../api/api'
export default {
  data () {
    return {
      info: {},
      infoList: [],
      page: 0,
      pagenum: 7,
      flag: false
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    // 注册scroll事件并监听
    scrollHandler () {
      console.log(this.flag)
      if (this.flag) {
        const st = document.documentElement.scrollTop || document.body.scrollTop
        const ch = this.$refs.myFans.clientHeight
        if (st + window.innerHeight >= ch) {
          this.rewardMemberList()
        }
      }
    },
    rewardMember: function () {
      let _this = this
      rewardMember().then(function (res) {
        _this.info = res.data
      }).catch(function (err) {
        console.log(err)
      })
    },
    rewardMemberList: function () {
      this.page += 1
      let _this = this
      let params = {
        page: _this.page,
        pagenum: _this.pagenum
      }
      rewardMemberList(params).then(function (res) {
        if (res.data.length >= _this.pagenum) {
          _this.flag = true
        } else {
          _this.flag = false
        }
        _this.infoList = _this.infoList.concat(res.data)
      }).catch(function (err) {
        _this.flag = false
        console.log(err)
      })
    },
    toAttention (id, index) {
      shopFocus(id).then(res => {
        this.infoList[index].guanzhu = true
        // console.log(res.data)
      }).catch(err => {
        // console.log(err)
      })
    },
    cancelAttention (id, index) {
      shopCancel(id).then(res => {
        this.infoList[index].guanzhu = false
        // console.log(res.data)
      }).catch(err => {
        // console.log(err)
      })
    }
  },
  mounted () {
    this.rewardMember()
    this.rewardMemberList()
  }
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */
	@border-color: #e5e5e5;
	.app-containerFans {
		min-height: 1234px;
		background-color: #f4f4f4;
	}
	img {
		border-radius: 50%;
	}
	.app-containerFans .head {
		height: 317px;
		width: 100%;
		margin-bottom: 10px;
		border-bottom: 1px solid @border-color;
		background-color: #fff;
		padding-top: 250px;
		box-sizing: border-box;
		position: relative;
		.user-img {
			height: 149px;
			width: 149px;
			border: 2px solid @border-color;
			border-radius: 50%;
			padding: 2px;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			right: 0;
			top: 40px;
			margin: auto;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.user-info {
			height: 32px;
			p {
				width: 50%;
				line-height: 32px;
				line-height: 32px;
				text-align: center;
				border-right: 1px solid @border-color;
				box-sizing: border-box;
				font-size: 28px;
				color: #666;
				float: left;
				span {
					font-size: 32px;
					color: #9e2026;
				}
			}
			p:nth-child(2) {
				border-right: none;
			}
		}
	}

	.app-containerFans .mainFans {
		background-color: #fff;
		border-top: 1px solid @border-color;
		margin-bottom: 100px;
		li {
			height: 150px;
			padding: 0 30px;
			.fans-img {
				width: 90px;
				height: 90px;
				margin-top: 30px;
				float: left;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.fans-info {
				width: 85%;
				height: 100%;
				float: right;
				border-top: 1px solid @border-color;
				span {
					font-size: 28px;
					display: inline-block;
				}
				span:nth-child(1) {
					line-height: 150px;
					float: left;
					color: #333;
					width: 75%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				span:nth-child(2) {
					height: 48px;
					width: 120px;
					float: right;
					color: #f15511;
					border: 2px solid #f15511;
					margin-top: 50px;
					text-align: center;
					border-radius: 2px;
					box-sizing: border-box;
				}
			}
			.fans-info.active span:nth-child(2) {
				border-color: #999;
				color: #999;
			}
		}
		li:nth-child(1) .fans-info {
			border-top: none;
		}
	}
</style>
