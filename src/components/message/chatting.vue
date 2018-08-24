<template>
	<div class="chatting">
	    <div class="fixednumMaskchat">
	       <div class="chatsomething">
				<div class="chattingHeader">
				    扬名红木
					<div class="icon-wendang iconfont"></div>
					<div class="icon-gengduo iconfont"></div>
				</div>
				<div class="chattingBody">
					
				</div>
				<div class="chattingFooter">
					<textarea name="" id="" cols="40" rows="1" v-model="textMsg"></textarea>
					<div class=" iconfont" @click="sendMsg">发送</div>
					<!-- <div class="icon-tianjia iconfont"></div> -->
				</div>
		   </div>
        </div>
	</div>		
</template>
<script>
export default {

}
</script>
<style scoped>
    .chatting{
    	height:100%;
    }
    .fixednumMaskchat {
	  position: fixed;
	  width: 750px;
	  top: 0;
	  bottom: 0;
	  z-index: 999;
	}
	.chatsomething{
		position: relative;
	    left:0;
	    bottom: 0;
	    z-index: 1100;
	    width: 100%;
	    height:100%;
	    background: white;
	}
	.chatting .chatsomething .chattingHeader{
		height: 80px;
		border-bottom: 1px solid #e5e5e5;
		color: #414141;
		font-size: 28px;
		text-align: center;
		position: relative;
		line-height: 80px;
	}
	.chatting .chatsomething .chattingHeader .iconfont{
        color: #999999;
        position: absolute;
        margin:0px;
	}
	.chatting .chatsomething .chattingHeader .iconfont:nth-child(1){
		right: 80px;
		font-size: 32px;
	}
	.chatting .chatsomething .chattingHeader .iconfont:nth-child(2){
		right: 20px;
		font-size: 30px;
	}
	.chatting .chatsomething .chattingFooter{
		height: 98px;
		position: absolute;
		bottom: 0px;
		width: 100%;
		border-top: 1px solid #e5e5e5;
	}
	.chatting .chatsomething .chattingFooter textarea{
		width: 538px;
		height: 60px;
		margin-left:30px;
		border:1px solid #dcdcdc;
		vertical-align: middle;
		font-size: 34px;
	}
	.chatting .chatsomething .chattingFooter .iconfont{
		color: #999999;
		line-height:98px;
		margin:0;
		font-size:52px;
		vertical-align: middle;
		margin-left: 15px;
	}
</style>