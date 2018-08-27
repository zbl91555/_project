<template>
      <div class = "cover" @click.stop="isShow">
      <div class = "promptMessage">该拍品已经下架</div>
      <div class = "confirm" @click.stop="isShow">知道了</div>
    </div>
</template>

<script>
export default {
  name: 'auctionErr',
  methods: {
    // 弹出层
    isShow () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.cover {
  width : 100%;
  height : 100%;
  position: fixed;
  background-color : rgba(0,0,0,.5);
  z-index : 991;
}
.cover .promptMessage {
  width : 100%;
  height : 1.4666rem;
  background-color : #fff;
  color : #d2d2d2;
  text-align : center;
  line-height : 1.4666rem;
  position: absolute;
  bottom : 1.0444rem;
  z-index : 992;
  border-bottom : 1px solid #ededef;
}
.cover .confirm {
  width : 100%;
  height : 1.0444rem;
  background-color : #fff;
  color : rgb(181, 84, 89);
  text-align : center;
  line-height : 1.0444rem;
  position: absolute;
  bottom : 0;
  z-index : 992;
}
</style>
