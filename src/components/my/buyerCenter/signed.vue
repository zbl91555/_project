<template>
	<div class="app-container">
		<div class="list">
			<p>个性签名</p>
			<input type="text" v-model="newMsg" placeholder="请输入个性签名" />
			<i v-if="shibaiShow" @click="clear" class="icon-shibai iconfont"></i>
		</div>
		<div class="sub">
			<span @click="sendSigned()">确认</span>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'vant'
	import {sendSigned} from '../../../api/api'
	export default {
		data() {
			return {
				oldMsg: '',
				newMsg: '',
				shibaiShow:true
			}
		},
		props:['signes'],
		methods: {
			clear(){
				this.newMsg = '';
				this.shibaiShow = false
			},
			sendSigned: function() {
				if(this.newMsg == ''){
					alert('个性签名不能为空')
				}
				if(this.oldMsg == this.newMsg) {
					this.$emit('getsigneMsg',this.newMsg)
					return;
				}
				let params = {
					signature: this.newMsg,
				};
				sendSigned(params).then(res =>{
						if(res.code == '200') {
							this.$emit('getsigneMsg',this.newMsg)
							this.$store.commit('revise',true)
							// this.$router.push('/buyerCenter/buyerSet')
						}
					})
					.catch(err =>{
						Toast(err.data.message)
					})
			}
		},
		mounted() {
			this.oldMsg = this.signes
			this.newMsg = this.signes
			if(this.newMsg == ''){
				this.shibaiShow = false
			}else{
				this.shibaiShow = true
			}
		},
		watch:{
			newMsg(now,old){
				if(now == ''){
					this.shibaiShow = false
				}else{
					this.shibaiShow = true
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	/*
	 * @border-color: 统一边框颜色
	 * */
	
	@border-color: #e5e5e5;
	.app-container {
		min-height: 1302px;
		background-color: #f4f4f4;
		padding-top: 30px;
	}
	.icon-shibai{
		margin-top:60px;
		font-size:40px;
		color: #C8C8C8;
	}
	.list,
	.sub {
		width: 100%;
		padding: 0 30px;
		box-sizing: border-box;
	}
	
	.list {
		height: 110px;
		background-color: #fff;
		border-bottom: 1px solid @border-color;
		border-top: 1px solid @border-color;
		p {
			width: 178px;
			line-height: 110px;
			font-size: 28px;
			color: #333;
		}
		input {
			display: inline-block;
			width: 72%;
			border: none;
			outline: none;
			-webkit-tap-highlight-color: transparent;
			font-size: 24px;
			color: #999;
			height: 107px;
			margin-top: 1px;
		}
		p,
		input {
			float: left;
		}
	}
	
	.sub {
		height: 88px;
		margin-top: 200px;
		span {
			display: block;
			width: 100%;
			height: 100%;
			line-height: 88px;
			text-align: center;
			background-color: #9e2026;
			border-radius: 5px;
			color: #fff;
			font-size: 30px;
		}
	}
</style>