<template>
	<div class="app-containerGift">
		<ul class="mainGift">
			<li class="head">
				<h1>{{info.total}}</h1>
				<p>累计奖励</p>
				<div class="op">
					<div class="op-left">
						<p>预计奖励</p>
						<p>{{info.freeze}}</p>
					</div>
					<div class="op-right">
						<p>可提现奖励</p>
						<p>{{info.tixian}}</p>
						<router-link to="/promotionGiftDrawMoney">
							<i class="iconfont icon-tixian"></i> 去提现
						</router-link>
					</div>
				</div>
				<div class="rule" @click="showRule">
					<i class="iconfont icon-guize"></i>
					<i>规则</i>
				</div>
			</li>
			<li class="detail">
				<div class="detail-list">
					<router-link to="/myFans">
						<i class="iconfont icon-tuandui"></i>
						<p>我的铁粉</p>
					</router-link>
				</div>
				<div class="detail-list">
					<router-link to="/bonus">
						<i class="iconfont icon-xiaofeimingxidan"></i>
						<p>奖金明细</p>
					</router-link>
				</div>
				<div class="detail-list">
					<div @click.stop="openPreview">
						<i class="iconfont icon-erweima1"></i>
						<p>专属二维码</p>
					</div>
				</div>
			</li>
			<li class="seven-data">
				<p class="titleSeven"><span></span>最近七天奖励数据</p>
				<div class="basicLineChart" id="main"></div>
			</li>
			<!-- <li class="intr">
				<p class="titleSeven">活动说明</p>
				<dl>
					<dt>一、推荐分享</dt>
					<div class="space"></div>
					<dd>1.点击“专属二维码”。</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
					<dd>2.长按改二维码图片，可将专属二维码保存到手机</dd>
				</dl>
			</li> -->
		</ul>
	<!-- 是否弹出规则 -->
    <div id="fixednumMain" v-if="showveri">
      <div @click="closeshowveri" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="telsharesomething">
            <div style="border-bottom:1px solid #e5e5e5;height:46px;font-size:18px;font-weight:bold;text-align: center;padding-top:10px;">
			规则
				<i @click="closeshowveri" style="font-size:20px;position: absolute;right: 0;top:8px;right:8px;color:#999999" class="iconfont icon-guanbi2"></i>
            </div>
            <div style="padding:10px 15px;text-align:left;font-size:14px;line-height:20px;">
				1.活动玩法：<br>
				转发“专属二维码”或平台内任意拍品链接，成功邀请好友关注公众号即可成为您的铁粉。
            </div>
            <div style="padding:0 15px;text-align:left;font-size:14px;">
				2.活动奖励：<br>
				推荐奖励：您的铁粉成为“认证商户”后，并上传5件拍品，通过平台审核有效后，您将获得15元的现金收益；
            </div>
            <div style="text-indent:30px;padding:10px 15px;text-align:left;font-size:14px;">
				优选奖励：若对方成为平台“优选店铺”，您还会获得其店铺1‰的交易额奖励。
            </div>
            <div style="text-indent:30px;padding:0 15px;text-align:left;font-size:14px;">
				成交奖励：您的粉丝在淘拍堂参与竞拍，成交付款后，确认收货。您将获得交易额1‰的奖励。
            </div>
            <div style="margin-top: 20px;color: #a1a1a1;">以上奖励均为平台支付，相关解释权归淘拍堂。</div>
      </div>
    </div>
	</div>
</template>
<script type="text/javascript">
import {reward, rewardCode} from '../../api/api'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { ImagePreview } from 'vant'
// import 'echarts/lib/component/title'
export default {
  data () {
    return {
      info: {},
      previewImg: [],
      showveri: false
    }
  },
  methods: {
    showRule () {
      this.showveri = true
    },
    closeshowveri () {
      this.showveri = false
    },
    // 二维码预览
    openPreview () {
      ImagePreview(this.previewImg, 0)
    },
    // echarts插件
    echarts ({categories, data}) {
      var datas = data.slice(1, data.length - 1)
      datas = datas.split(',')
      var list = []
      for (let i = 0; i < datas.length; i++) {
        list.push(+datas[i])
      }
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('main'))
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
              rotate: 45
            },
            axisPointer: {
              snap: true
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999'
              }
            }
          },
          yAxis: {
            name: '奖励金额(元)',
            nameLocation: 'start',
            nameRotate: 90,
            // nameLocation: 'middle',
            offset: -5,
            nameTextStyle: {
              color: '#9e2026',
              padding: [0, 0, 15, 0]
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            }
          },
          series: [{
            name: '可提现奖励',
            type: 'line',
            data: list
          }]
        })
      })
    },
    reward: function () {
      let _this = this
      reward().then(function (res) {
        _this.info = res.data
        _this.info.categories = JSON.parse(_this.info.categories)
        _this.echarts(_this.info)
      })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path == '/find') {
        vm.showveri = true
      }
    })
  },
  mounted () {
    this.reward()
    rewardCode().then(res => {
      this.previewImg.push(res.data.url)
    })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色coupon
	* @pad: 统一边距
	* */
	.telsharesomething{
      position: fixed;
      left:5%;
      top:15%;
      z-index: 1100;
      width:90%;
      height:800px;
      background: white;
      text-align: center;
      border-radius: 10px;
      padding-top: 20px;
    }
	@border-color: #d2d2d2;
	@pad: 20px;
	.app-containerGift {
		min-height: 1234px;
		background-color: #ededed;
		padding-top: 20px;
	}

	.iconfont {
		font-size: 12px;
	}
	p{
		font-size: 28px !important;
		margin-top: 0;
	}
	.mainGift {
		width: 100%;
		margin-bottom: 100px;
		overflow: hidden;
		li {
			background-color: #fff;
			margin-bottom: 10px;
			border-top: 1px solid @border-color;
			border-bottom: 1px solid @border-color;
		}
		li:nth-child(1) {
			border-top: none;
		}
		.head {
			height: 279px;
			position: relative;
			h1 {
				padding-top: 50px;
				font-size: 60px;
				color: #9e2026;
			}
			p {
				color: #999;
				font-size: 24px;
			}
			h1,
			p {
				text-align: center;
			}
			.op {
				height: 75px;
				padding: 20px 0;
				.op-left,
				.op-right {
					height: 100%;
					width: 50%;
					float: left;
					border-right: 1px solid @border-color;
					box-sizing: border-box;
					position: relative;
					p {
						width: 100%;
						text-align: center;
					}
					p:nth-child(1) {
						color: #666;
					}
					p:nth-child(2) {
						color: #333;
					}
				}
				.op-right p {
					width: 50%;
					padding-left: 50px;
				}
				.op-right a {
					display: block;
					width: 140px;
					height: 70px;
					background-color: #fd8f01;
					border-top-left-radius: 35px;
					border-bottom-left-radius: 35px;
					text-align: right;
					line-height: 70px;
					padding-right:10px;
					box-sizing: border-box;
					color: #fff;
					position: absolute;
					right: 0;
					top: 0;
					i {
						color: #fff;
						font-size: 40px;
						/*line-height: 2;*/
						position: absolute;
						left: 18px;
					}
				}
			}
		}
		.detail {
			height: 190px;
			.detail-list {
				float: left;
				width: 33.3%;
				height: 100%;
				padding: 37px 0;
				box-sizing: border-box;
				text-align: center;
				i {
					font-size: 60px;
					color: #f15511;
				}
			}
		}
		.seven-data {
			height: 394px;
			padding: 30px @pad;
			.basicLineChart {
				width : 100%;
				height : 100%;
			}
			.titleSeven {
				height: 26px;
				border-left: 6px solid #9e2026;
				font-size: 28px;
				line-height: 26px;
				text-indent: 5px;
			}
		}
		.intr {
			padding: 30px @pad;
			.titleSeven {
				text-align: center;
			}
			.title,
			dt {
				font-size: 28px;
			}
			dd {
				color: #666;
				line-height: 2;
			}
		}
	}
	.space{
		height: 30px;
	}
	.icon-tixian{
		margin: 0
	}
	.rule{
		position: absolute;
		right:20px;
		top:20px;
		font-size: 28px;
	}
</style>
