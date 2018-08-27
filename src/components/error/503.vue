<template>
  <div class="box">
    <div><i class="iconfont icon-xitongweihu"></i></div>
    <div class="text">系统维护中...</div>
  </div>
</template>

<script>

</script>

<style scoped lang='less'>
.box {
  width: 200px;
  height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;

  div {
    text-align: center;
  }

  div:first-child {
    margin-bottom : 10px;
  }

  i {
    font-size: 120px;
    color: #d2d2d2;
  }

  .text {
    font-size : 28px;
  }
}
</style>
