<template>
	<div class="app-containersdf">
		<div class="navvs">
			<span v-for="(e, $index) in navList" :key="e" @click="getUnused(e.navType, $index)" :class="{'active' : flag == $index}">
				{{e.navText}}
			</span>
		</div>
		<div class="mainmain">
			<ul>
				<li v-for="(ele, $index) in list" :key="ele" :class="type">
					<p><span>平台券</span>&nbsp;新手专享优惠券</p>
					<p>￥{{ele.denomination}}</p>
					<p>满￥{{ele.first}}使用</p>
					<p @click="selectStyle (ele, $index) " :class="{'active':ele.active2,'':!ele.active2}">
						<span>
							{{timestampToTimeYMD(ele.receive_time)}}-{{timestampToTimeYMD(ele.expire_time)}}
						</span>
						<span v-if="type == 'unused'">
							详情
							<i class="iconfont icon-jiantouxiangxia"></i>
							<div class="tips">新手拍品可用</div>
						</span>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import {getUnused} from '../../../api/api'
export default {
  data () {
    return {
      flag: 0, // 导航高亮
      active2: false, // 提示框显示隐藏
      // 接口信息
      list: [],
      // 导航信息
      navList: [{
        navText: '待使用',
        navType: 'unused'
      }, {
        navText: '已使用',
        navType: 'used'
      }, {
        navText: '已过期',
        navType: 'expired'
      }],
      type: 'unused',
      chosen: false
    }
  },
  methods: {
    // 点击详情弹出提示框
    selectStyle: function (item, index) {
      this.$nextTick(function () {
        this.list.forEach(function (item) {
          Vue.set(item, 'active2', false)
        })
        //                Vue.set(item, 'active2', true);
        // for (var i = 0; i <= this.list.length; i++) {
        //          this.list[i].active2 = false;
        //  }
        console.log(this.list)
        this.list[index].active2 = !this.list[index].active2
      })
    },
    // 请求待使用接口
    getUnused: function (_type, index) {
      let _this = this
      // 设置导航高亮
      _this.flag = index
      // 控制list样式
      _this.type = _type
      // 请求接口数据
      let params = {
        type: _type,
        page: '1',
        pagenum: '5'
      }
      getUnused(params).then(function (res) {
        // 请求成功渲染数据
        if (res.code == '200') {
          _this.list = res.data
        };
      })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getUnused('unused', 0)
  }
}
</script>
<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */

	@border-color: #d2d2d2;
	.app-containersdf {
		min-height: 1234px;
	}

	.iconfont {
		font-size: 24px;
	}

	.navvs {
		height: 78px;
		background-color: #fff;
		padding: 19px 0;
		box-sizing: border-box;
		span {
			float: left;
			display: block;
			height: 40px;
			line-height: 40px;
			width: 33.3%;
			border-right: 1px solid @border-color;
			box-sizing: border-box;
			text-align: center;
			color: #333;
			font-size: 28px;
		}
		span.active {
			color: #9e2026;
		}
	}

	.mainmain {
		overflow: hidden;
		padding: 24px;
		margin-bottom: 76px;
		ul li.unused {
			background-image: url(../../../assets/images/unused.png);
		}
		ul li.expired {
			background-image: url(../../../assets/images/expired.png);
		}
		ul li {
			height: 260px;
			width: 100%;
			border-radius: 8px;
			background-color: #fff;
			background-image: url(../../../assets/images/used.png);
			background-size: 100%;
			background-repeat: no-repeat;
			margin-bottom: 40px;
			color: #fff;
			position: relative;
			p:nth-child(1) {
				line-height: 2.5;
				text-align: center;
				font-size: 28px;
				span {
					font-size: 24px;
					border: 2px solid #fff;
					padding: 5px 10px;
					border-radius: 4px;
				}
			}
			p:nth-child(2) {
				font-size: 54px;
				padding-left: 67px;
			}
			p:nth-child(3) {
				padding-left: 80px;
				line-height: 2.5;
			}
			p:nth-child(4) {
				line-height: 2.5;
				color: #666;
				font-size: 24px;
				padding: 0 30px;
				span:nth-child(2) {
					float: right;
				}
				.tips {
					height: 48px;
					width: 200px;
					line-height: 48px;
					text-align: center;
					border-radius: 5px;
					background-color: rgba(0, 0, 0, 0.5);
					position: absolute;
					right: 0;
					bottom: -40px;
					display: none;
					color: #fff;
				}
			}
			p .iconfont{
				display: inline-block;
				transition: all 0.3s ease;
			}
			p.active {
				.tips {
					display: block;
				}
				.iconfont{
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
