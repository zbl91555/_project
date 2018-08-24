<template>
	<div class="app-containerBonus" ref="ctn">
		<div class="headBonus">
			<p>￥{{info.allmoney}}</p>
			<p>累计奖励</p>
			<p>累计提现:  {{info.reward_withdrawal_total == null ? '0' :info.reward_withdrawal_total}}</p>
		</div>
		<ul class="tabBonus">
			<li @click="rewardBonusList('0')"  :class="{active: active == '0'}">
				<div class="tab-con">
					<p>奖金收入</p>
					<!-- <p>{{info.allmoney}}</p> -->
				</div>
			</li>
			<li @click="rewardBonusList('1')" :class="{active: active == '1'}">
				<div class="tab-con">
					<p>奖金提现</p>
				<!-- 	<p>{{info.cash}}</p> -->
				</div>
			</li>
			<div class="aline">
			</div>
		</ul>
		<table cellspacing="0" border="0" class="in-listBonus" v-if="active == '0'">
			<tr>
				<th>时间</th>
				<th>奖金</th>
				<th>朋友微信</th>
				<th>交易类型</th>
			</tr>
		    <tr v-for="i in infoList">
				<td>{{timestampToTime(i.addTime)}}</td>
				<td>￥{{i.money}}</td>
				<td>{{i.userName}}</td>
				<td>{{i.type_reward}}</td>
				<div v-if="i.is_audit == '2' && i.type == '3'" class="checkStateFaile">审核失败</div>
				<div v-if="i.is_audit == '0' && i.type == '3'" class="checkStating">审核中</div>
				<div v-if="i.is_audit == '1' && i.type == '3'" class="checkStateSuccess">审核成功</div>
			</tr>
		</table>
		<ul class="out-listBonus" v-if="active == '1'">
			<li v-for="item in infoLists">
				<div class="left">
					<p class="title">{{item.name}}</p>
					<p class="time">
						<span>{{item.type_reward}}</span>
						<span>{{timestampToTime(item.addTime)}}</span>
					</p>
				</div>
				<div class="right">
					<span>{{item.money}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {rewardBonus,rewardBonusList} from '../../../api/api'
	export default {
		data() {
			return {
				active: '0',  // tab切换样式
				info: {},
				infoList: [],
				infoLists:[],
				page:0
			}
		},
		created() {
		    window.addEventListener("scroll", this.scrollHandler);
		},

		destroyed() {
		    window.removeEventListener("scroll", this.scrollHandler);
		},
		methods: {
			scrollHandler(){
				const st = document.documentElement.scrollTop || document.body.scrollTop;
			      const ch = this.$refs.ctn.clientHeight;
			      if (st + window.innerHeight >= ch+50) {
			        this.rewardBonusList(this.active);
			      }
			},
			rewardBonus() {
				let _this = this;
				rewardBonus().then(function(res){
					_this.info = res.data;
					console.log(_this.info);
				}).catch(function(err){
					console.log(err);
				})
			},
			rewardBonusList(type) {
				let _this = this;
				_this.active = type;
				_this.page+=1
				let params={
					pagenum: '10',
					page: _this.page,
				}
				rewardBonusList(type,params).then(function(res){
					if(type=='0'){
						_this.infoList = _this.infoList.concat(res.data);
					}else{
						_this.infoLists = _this.infoLists.concat(res.data);
					}
				}).catch(function(err){
					console.log(err);
				})
			},
		},
		mounted() {
			this.rewardBonus();
			this.rewardBonusList('0');
		},
	}
</script>

<style lang="less" scoped>
	/*
	 * @border-color: 统一边框颜色
	 * */
	
	@border-color: #e5e5e5;
	.app-containerBonus {
		min-height: 1234px;
		background-color: #f4f4f4;
	}
	
	.headBonus,
	.tabBonus,
	.in-listBonus,
	.out-listBonus {
		background-color: #fff;
		margin-bottom: 10px;
	}
	.in-listBonus,
	.out-listBonus{
		margin-bottom: 100px;	
		width: 100%;	
	}
	.headBonus {
		height: 300px;
		width: 100%;
		border-bottom: 1px solid @border-color;
		box-sizing: border-box;
		overflow: hidden;
		p {
			text-align: center;
			color: #999;
		}
		p:nth-child(1) {
			color: #9e2026;
			font-size: 56px;
			margin-top: 50px;
		}
		p:nth-child(2) {
			font-size: 28px;
			line-height: 3;
		}
		p:nth-child(3) {
			font-size: 24px;
		}
	}
	
	.tabBonus {
		height: 114px;
		border-bottom: 1px solid @border-color;
		border-top: 1px solid @border-color;
		box-sizing: border-box;
		position: relative;
		li {
			width: 50%;
			height: 114px;
			float: left;
			/*border-right: 1px solid @border-color;*/
			padding: 0 70px;
			box-sizing: border-box;
			.tab-con {
				padding: 27px 0;
				text-align: center;
				p {
					color: #333;
				}
				p:nth-child(1) {
					font-size: 28px;
				}
				p:nth-child(2) {
					font-size: 24px;
				}
			}
		}
		li.active {
			.tab-con {
				height: 114px;
				border-bottom: 3px solid #9e2026;
				box-sizing: border-box;
			}
			p {
				color: #9e2026;
			}
		}
		li:nth-child(2) {
			border-right: none;
		}
	}
	
	.in-listBonus {
		tr {
			display: block;
			padding: 0 30px;
			box-sizing: border-box;
			width: 100%;
			position: relative;
			th,
			td {
				display: inline-block;
				box-sizing: border-box;
				text-align: left;
			}
			border-bottom: 1px solid @border-color;
			th {
				width: 100%;
				padding: 31px 0;
				font-size: 28px;
				color: #666;
				font-weight: 400;
			}
			th:nth-child(1),
			td:nth-child(1) {
				width: 25%;
			}
			th:nth-child(2),
			td:nth-child(2) {
				width: 20%;
			}
			th:nth-child(3),
			td:nth-child(3) {
				width: 30%;
			}
			th:nth-child(4),
			td:nth-child(4) {
				width: 20%;
			}
			td {
				padding: 44px 0;
				font-size: 28px;
				color: #333;
			}
		}
	}
	
	.out-listBonus {
		border-bottom: 1px solid @border-color;
		padding-left: 30px;
		box-sizing: border-box;
		li {
			height: 140px;
			border-bottom: 1px solid @border-color;
			padding-right: 30px;
			box-sizing: border-box;
			.left,
			.right {
				height: 100%;
			}
			.left {
				width: 60%;
				float: left;
				.title {
					line-height: 3;
					width: 100%;
					font-size: 28px;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.time {
					font-size: 24px;
					color: #999;
				}
			}
			.right {
				line-height: 140px;
				text-align: right;
				width: 40%;
				float: right;
				font-size: 36px;
				color: #06bc07;
			}
		}
		li:nth-last-of-type(1) {
			border-bottom: none;
		}
	}
	.aline{
		height: 60px;
		border-left:1px solid @border-color;
		width:2px;
		position: absolute;
		left:50%;
		top:27px;
	}
	.checkStateFaile{
		text-align: center;
		line-height: 31px;
		color: white;
		width: 104px;
		height: 31px;
		background-color: #fd8f01;
		border-radius: 15px;
		font-family: AdobeHeitiStd-Regular;
		font-size:14px !important;
		position: absolute;
		right: 20px;
		top:20px;
	}
	.checkStateSuccess{
		text-align: center;
		line-height: 31px;
		color: white;
		width: 104px;
		height: 31px;
		background-color: #db0909;
		border-radius: 15px;
		font-family: AdobeHeitiStd-Regular;
		font-size:14px !important;
		position: absolute;
		right: 20px;
		top:20px;
	}
	.checkStating{
		text-align: center;
		line-height: 31px;
		color: white;
		width: 104px;
		height: 31px;
		background-color: #999999;
		border-radius: 15px;
		font-family: AdobeHeitiStd-Regular;
		font-size:14px !important;
		position: absolute;
		right: 20px;
		top:20px;
	}
</style>