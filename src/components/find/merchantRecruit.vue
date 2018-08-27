<template>
	<div class="merchantRecruit">
		<div @click="joinNow" class="joinNow">立即加入</div>
	</div>
</template>
<script>
export default {

  data () {
    return {

    }
  },
  methods: {
    joinNow () {
      this.$router.push('/sellerCenter/realnameApplication')
    }
  }
}
</script>
<style scoped>
 .merchantRecruit{
	width: 100%;
	height: 2293px;
	background: url('../../assets/images/joinNow.png');
	background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 100px;
 }
 .merchantRecruit .joinNow{
	width: 90%;
	height: 70px;
	position: fixed;
	bottom: 14px;
	text-align: center;
	line-height: 70px;
	font-size: 28px;
	background: #9e2026;
	color: white;
	border-radius: 36px;
	margin-left: 5%
  }
</style>
