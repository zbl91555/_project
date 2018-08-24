<template>
	<div class="app-containerqrCode" id="qrCode">
		<div class = "imgBox">
			<img :src="url" alt="">
		</div>
		<div class="remindqrCode">
			<img src="../../../assets/images/qr-code2.png"/>
		</div>
	</div>
</template>

<script>
	import {rewardCode} from '../../../api/api'
	// import canvas from '../../../../static/lib/canvas2image'
	// import html2canvas from '../../../../static/lib/html2canvas'
	export default {
		data() {
			return {
				url : ''
			}
		},
		methods: {
			rewardCode(){
				rewardCode().then(res => {
					 this.url = res.data.url;
				})
				.catch((err) => {
					console.log(err);
				})
			},
		},
		mounted() {
			this.rewardCode();
		},
	}
</script>

<style lang="less" scoped>
	/*
	 * @border-color: 统一边框颜色
	 * */
	 .imgBox {
		 width : 100%;
		 height : 941px;
	 }
	.app-containerqrCode .imgBox > img {
		width : 100%;
	 }
	@border-color: #e5e5e5;
	.remindqrCode{
		width: 100%;
		height: 148px;
		padding: 0 60px;
		box-sizing: border-box;
		margin-top: 50px;
		img{
			display : block;
			height: 100%;
			margin-left : 50%;
			transform : translateX(-50%);	
		}
	}
</style>