<template>
	<div class="dealAndInform">
		<div class="title">
			<div class="floatl" :class="nowindex==1?selected:''" @click="inform()">交易物流</div>
			<div class="floatr" :class="nowindex==1?selected:''" @click="inform()">通知</div>
		</div>
		<div class="trads">
			<div class="whiteb">
				<div class="content">
					<div class="orderstate">订单派送中...</div>
					<div class="time">今天09:04</div>
				</div>
				<div class="contentbottom">
					<div class="descrip">
						<div>老物件黄花梨大笔筒，木质细腻，纹理行云流水。笔筒为小底</div>
						<div class="orderlistnum">运单编号；8888888888888...</div>
					</div>
					<div class="img"></div>
				</div>
			</div>
			<div class="whiteb">
				<div class="content">
					<div class="orderstate">订单派送中...</div>
					<div class="time">今天09:04</div>
				</div>
				<div class="contentbottom">
					<div class="descrip">
						<div>老物件黄花梨大笔筒，木质细腻，纹理行云流水。笔筒为小底</div>
						<div class="orderlistnum">运单编号；8888888888888...</div>
					</div>
					<div class="img"></div>
				</div>
			</div>
		</div>
		<Navbar num='3'></Navbar>
	</div>		
</template>
<script>
import Navbar from "../common/Navbar";
export default {
	components: {
    	Navbar
  	},
  	data(){
  		return{

  		}
  	}
}
</script>
<style scoped>
	.dealAndInform{
		background: #f4f4f4;
		min-height: 1500px
	}    
	.title{
		overflow: hidden;
		padding-right: 160px;
		background: white
	}
	.floatl{
		float: left;
		height: 100px; 
		width: 200px;
		border-bottom: 2px solid red;
		color: red;
		line-height: 100px;
		text-align: center;
		margin-left: 140px;
		font-weight:bold;
	}
	.floatr{
		float: right;
		height: 100px; 
		width: 200px;
		line-height: 100px;
		text-align: center;
		font-weight:bold;
	}
	.selected{
		border-bottom: 2px solid red;
		color: red
	}
	.date{
		width: 200px;
		height: 100px;
		/* background: */
	}
	.whiteb{
		background: white;
		padding:20px;
		width: 720px;
		margin: 0 auto;
		margin-top: 40px;
		height: 270px;
	}
	.content{
		overflow: hidden;
	}
	.orderstate{
		float: left;
	}
	.time{
		float: right;
		color: #a1a1a1;
		font-size: 28px
	}
	.contentbottom{
		margin-top: 20px;
	}
	.descrip{
		float: left;
		width: 540px;
	}
	.img{
		float: right;
		border: 1px solid #a1a1a1;
		width: 140px;
		height: 140px;
		background-image: url('../../assets/images/maijia2.png');
		background-repeat: no-repeat;
	    background-position: center;
	    background-size: cover;
	}
	.orderlistnum{
		margin-top: 40px
	}
</style>