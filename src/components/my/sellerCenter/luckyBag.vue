<template>
    <div class="luckyBag">
      <div class="createMain">
       <div class="tips">
          领取后将直接关注您的店铺
        </div>
        <div class="listRow">
          <div class="title">
            福袋个数
          </div>
          <div class="content numInput redPackNum">
            <div layerheight="300" class="input placeholder">
              填写福袋个数
            </div>
            个
          </div>
        </div>
        <div class="tips">
          最大支持 5000 个，每个不能小于 1 元
        </div>
        <div class="listRow">
          <div class="title">
            总金额
          </div>
          <div class="content numInput redPackMoney">
            <div layerheight="300" class="input placeholder">
              填写福袋金额
            </div>
            元
          </div>
        </div>
        <div class="tips">
          收取 1% 手续费，过期后，剩余金额自动退至余额
        </div>


        <group>
          <x-switch title="新手福袋" v-model="value" prevent-default @on-click="onClick"></x-switch>
        </group>

        <!-- <div class="listRow">
          <div class="title">
            新手福袋
          </div>
          <div class="content redPackType">
            <div class="switchBtn on">
              <input type="checkbox" class="switch" value="on">
            </div>
          </div>
        </div> -->
        <div class="tips">
          开启按照福袋的个数随机分配，关闭是平均分配
        </div>
        <div class="listRow message">
          <textarea class="redPackMessage" placeholder="随便说一句"></textarea>
        </div>
       
        <div class="amount">
          <span>0.00</span>
        </div>
        <div class="buttonBanner">
          <button class="next">塞钱进福袋</button>
        </div>
        <router-link to="/sellerCenter/sellerTool/luckyBag/luckyBagrecord">
          <div class="records">
            查看发放福袋记录 &gt;
          </div>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
import { XSwitch, Group } from 'vux'
export default {
  components: {
    XSwitch,
    Group,
  },
  data() {
    return {
       value: false,
    };
  },
  created(){ 
  },
  methods: { 
    getstore(){
      let _this = this;     
      
    },
    onClick(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.value = newVal 
    }
  }, 
  mounted() {
    // this.getstore();
  }, 
};
</script>
<style >
  .luckyBag {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
    z-index: 999;
  }  
.luckyBag {
  min-height: calc(100vh + 60px) !important;
}
.luckyBag body {
  position: relative;
}
.luckyBag .createMain {
  overflow: hidden;
  padding-bottom: 60px;
}
.luckyBag .createMain .listRow {
  height: 100px;
  padding: 0 28px;
  font-size: 28px;
  line-height: 100px;
  background-color: #FFF;
}
.luckyBag .createMain .listRow.message {
  height: 160px;
  text-align: left;
  padding-top: 10px;
}
.luckyBag .createMain .listRow .title {
  width: 30%;
  float: left;
}
.luckyBag .createMain .listRow .content {
  width: 70%;
  float: left;
  text-align: right;
}
.luckyBag .createMain .listRow .numInput .input {
  margin-right: 15px;
  color: #169ADA;
  font-size: 16px;
}
.luckyBag .createMain .listRow .numInput .input.placeholder {
  color: #888;
  font-size: 15px;
}
.luckyBag .createMain .listRow .numInput .input .cursor {
  padding-right: 1px;
  border-right: 2px solid #576B95;
}
.luckyBag .createMain .listRow .switchBtn {
  float: right;
  width: 52px;
  height: 32px;
  margin: 7px 0;
  display: block;
  cursor: pointer;
  overflow: hidden;
  border-radius: 16px;
}
.luckyBag .createMain .listRow.message textarea {
  width: 100%;
  resize: none;
  border: none;
  height:160px;
  color: #999;
  font-size: 28px;
}
.luckyBag .createMain .listRow.message {
  margin-top: 10px;
}
.luckyBag .createMain .tips:first-child{
  clear: both;
  color: #999;
  font-size: 22px;
  height: 72px;
  line-height: 72px;
  text-align: left;
  margin: 0 0 0 30px;
}
.luckyBag .createMain .tips {
  clear: both;
  color: #999;
  font-size: 22px;
  height: 72px;
  line-height: 72px;
  text-align: right;
  margin: 0 30px 0 0;
}
.luckyBag .createMain .amount {
  font-size:74px;
  color: #333;
  margin-top: 51px;
  margin-bottom: 54px;
  text-align: center;
}
.luckyBag .createMain .buttonBanner button {
  width: 92%;
  color: #FFF;
  height: 88px;
  margin: 0 4%;
  border: none;
  font-size: 28px;
  line-height: 88px;
  border-radius: 5px;
  background-color: #9e2026;
}
.luckyBag .createMain .buttonBanner .doing {
  background-color: #CCC;
}
.luckyBag .createMain .records {
  position: absolute;
  width: 100%;
  bottom: 144px;
  max-width: 750px;
  text-align: center;
}
.luckyBag .createMain .records {
  color: #999;
  font-size: 22px;
}
.luckyBag .input {
  display: inline-block;
}


/*开关按钮*/
.luckyBag .weui-cells .vux-no-group-title{
  margin:0;
}
.luckyBag .weui-cells{
  height: 100px;
  margin-top: 0;
}
.luckyBag .vux-x-switch.weui-cell_switch{
  padding:0 30px;
}
.luckyBag .weui-cell_switch{
  padding:0 ;
  height: 100px;
}
.luckyBag .weui-cell__ft .weui-switch{
  width: 104px;
  height: 64px;
  border-radius: 35px;
}
.luckyBag .weui-label{
  color: #333;
  font-size: 28px;
}
.luckyBag .weui-switch:before, .luckyBag .weui-switch-cp__box:before{
  width: 100px;
  height: 62px;
  border-radius: 34px;
}
.luckyBag .weui-switch:after, .luckyBag .weui-switch-cp__box:after{
  width: 60px;
  height: 62px;
  border-radius: 50%;
}
.luckyBag .weui-switch:checked:after, .luckyBag .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{
  -webkit-transform: translateX(0.556667rem);
  transform: translateX(0.556667rem); 
}
</style>