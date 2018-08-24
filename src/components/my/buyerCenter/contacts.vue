<template>
	<div class="app-container">
		<div class="list">
			<p>联系人</p>
			<input type="text" v-model="contact" placeholder="请输入联系人" />
			<i v-if="shibaiShow" @click="clear" class="icon-shibai iconfont"></i>
		</div>
		<div class="sub">
			<span @click="sendContact()">确认</span>
		</div>
	</div>
</template>

<script>
	import {sendContact} from '../../../api/api'
	export default {
		data() {
			return {
				old:'',
				contact: '',
				shibaiShow:true
			}
		},
		props:['contac'],
		methods: {
			clear(){
				this.contact = '';
				this.shibaiShow = false
			},
			sendContact: function() {
				if(this.contact == ''){
					alert('联系人不能为空')
				}
				if (this.old == this.contact) {
					this.$emit('getcontactMsg',this.contact) 
				}else{
					let params = {
							contract: this.contact,
						};
					sendContact(params).then(res =>{
						if(res.code == '200') {
							this.$emit('getcontactMsg',this.contact)
							// this.$router.push('/buyerCenter/buyerSet')
						}
					})
					.catch(err =>{
						console.log(err)
					})
				}
				
			}
		},
		mounted() {
			this.old = this.contac
			this.contact = this.contac
			if(this.contact == ''){
				this.shibaiShow = false
			}else{
				this.shibaiShow = true
			}
	    },
	    watch:{
			contact(now,old){
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
		min-height: 1234px;
		background-color: #f4f4f4;
		padding-top: 30px;
	}
	.icon-shibai{
		margin-top:60px;
		font-size:40px;
		color: #C8C8C8;
	}
	.list {
		height: 110px;
		width: 100%;
		padding: 0 30px;
		box-sizing: border-box;
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
		padding: 0 30px;
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