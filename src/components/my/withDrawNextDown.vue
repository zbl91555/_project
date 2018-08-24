<template>
	<div class="withDrawNextDown">
		<div class="head">{{title}}</div>
		<div class="flow">
			<div class="apply">
				发起提现申请
				<div class="red"></div>
			</div>
			<div class="doing">
				<div>正在处理中</div>
				<div>预计{{timestampToTime(parseFloat(getDay))}}到账</div>
				<div class="icon-jindu iconfont"></div>
			</div>
			<div class="success">
				到账成功
				<div class="gray"></div>
			</div>
		</div>
		<div class="desc">
			<div class="price">
				<div>提现金额</div>
				<div>￥{{price}}</div>
			</div>
			<div class="price">
				<div>到账位置</div>
				<div>微信</div>
			</div>
		</div>
		<div class="haveDown" @click="successD">完成</div>
	</div>
</template>

<script>
export default {
  props: ["price", "title", "link"],
  data() {
    return {
      getDay: ""
    };
  },
  mounted() {
    let nowTime = new Date();
    this.getDay = nowTime.getTime() / 1000 + 3 * 86400;
  },
  methods: {
    successD() {
      this.$router.push(this.link);
    }
  }
};
</script>

<style scoped>
.withDrawNextDown .head {
  height: 36px;
  padding: 48px 42px;
  font-size: 28px;
}
.withDrawNextDown .flow {
  margin-left: 70px;
}
.withDrawNextDown .flow .apply {
  height: 144px;
  border-left: 1px solid #9e2026;
  padding-left: 84px;
  font-size: 28px;
  color: #666666;
  position: relative;
}
.withDrawNextDown .flow .apply .red {
  width: 30px;
  height: 30px;
  background-color: #9e2026;
  border-radius: 15px;
  position: absolute;
  left: -15px;
  top: 0px;
}
.withDrawNextDown .flow .doing {
  height: 176px;
  border-left: 1px solid #dedede;
  padding-left: 84px;
  position: relative;
}
.withDrawNextDown .flow .doing div:nth-child(1) {
  color: #333333;
  font-size: 30px;
}
.withDrawNextDown .flow .doing div:nth-child(2) {
  color: #666666;
  font-size: 24px;
}
.withDrawNextDown .flow .doing .icon-jindu {
  margin: 0;
  position: absolute;
  top: 0;
  left: -34px;
  font-size: 68px;
  background: #ffac00;
  color: white;
  border-radius: 34px;
}
.withDrawNextDown .flow .success {
  padding-left: 84px;
  font-size: 28px;
  color: #999999;
  position: relative;
}
.withDrawNextDown .flow .success .gray {
  width: 30px;
  height: 30px;
  background-color: #dedede;
  border-radius: 15px;
  position: absolute;
  left: -15px;
  top: 0px;
}
.withDrawNextDown .desc {
  width: 660px;
  border-top: 1px solid #dddddd;
  margin: 84px auto;
  font-size: 24px;
  padding-top: 10px;
}
.withDrawNextDown .desc .price {
  overflow: hidden;
  margin-top: 30px;
}
.withDrawNextDown .desc .price div:nth-child(1) {
  float: left;
  color: #999999;
}
.withDrawNextDown .desc .price div:nth-child(2) {
  float: right;
}
.haveDown {
  width: 320px;
  height: 68px;
  border-radius: 8px;
  border: solid 2px #9e2026;
  text-align: center;
  line-height: 68px;
  color: #9e2026;
  margin: 270px auto;
}
</style>