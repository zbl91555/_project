<template>
  <div class="certificationPaySucces">
      <div class="iconfont icon-finish"></div>
      <div class="scrib">{{msg[0].scrib}}</div>
      <div class="name">淘拍堂</div>
      <div class="money">￥{{msg[1].money}}</div>
      <div class="result" v-if="msg[3].boleen">您的申请工作人员将在三个工作日内给出回复</div>
      <div class="finish" @click="finishTo">完成</div>
  </div>
</template>

<script>

export default {
  props: {
    msg: Array //这样可以指定传入的类型，如果类型不对，会警告
  },
  data() {
    return {
      
    };
  },

  methods: {
      finishTo(){
        this.$router.push(this.msg[2].link)
      }
  },
};
</script>

<style scoped>
    .certificationPaySucces{
      background: #f4f4f4;
      height: 1300px;
      text-align: center;
      padding-top:108px;
    }
    .certificationPaySucces .icon-finish{
      font-size:88px;
      width: 120px;
      height: 120px;
      border-radius: 60px;
      background: #9e2026;
      color: white;
      line-height: 120px;
    }
    .certificationPaySucces .scrib{
      margin-top: 30px;
    }
    .certificationPaySucces .name{
      font-size: 32px;
      margin-top: 126px;
    }
    .certificationPaySucces .money{
      font-size: 68px;
      font-weight: bold;
    }
    .certificationPaySucces .result{
      color: #999999;
      margin-top: 30px;
    }
    .certificationPaySucces .finish{
      width: 318px;
      height: 68px;
      border: 2px solid #9e2026;
      color: #9e2026;
      line-height: 68px;
      border-radius: 5px;
      margin:420px auto; 
      font-size: 28px;
    }
</style>
