<template>
    <div class="payCertification">
      <h5 class="itemLabel">实名认证（请上传真实的个人信息，认证通过后将无法修改）</h5>  
      <div class="userinfoMain">
        <dl><dt>姓名</dt><dd><input type="text" placeholder="请输入真实的姓名"></dd></dl>
        <dl><dt>身份证号</dt><dd><input type="text" placeholder="请输入身份证号"></dd></dl>
        <dl><dt>联系电话</dt><dd><input type="text"  placeholder="请输入联系电话"></dd></dl>
      </div>
      <h6 class="itemLabelRight">请填写有效电话，工作人员将会致电核实材料</h6>

      <div class="userinfoMain">
        <dl><dt>店铺名称</dt><dd><input type="text" placeholder="XXXXX"></dd></dl>
      </div>
      <h6 class="itemLabelRight">认证后店铺名称将无法修改请慎重！</h6>
      <div class="userinfoMain">
        <h3 class="innerTit">身份证正面照</h3>
        <p class="innerTips">请用手机横向拍摄以保证图片正常显示</p>
        <div class="photoWrap">
          <img :src="IDFront">
        </div>
        <a href="javascript:;" class="btnImg">上传正面照</a>
        <p class="innerTips"> 照片必须清晰哟！</p>
      </div>

    </div>
</template>
<script>
  export default {
    data () {
      return {
        IDFront: '../../assets/images/IDFront.jpg',  //身份证正面照
        IDBack: '',  //身份证反面照
        IDAll: '', //身份证及个人合照
      }
    }
  }
</script>

<style scoped lang="less">
.payCertification{
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f4f4f4;
  max-width: 750px;
  

  .userinfoMain {
    width: 100%; background-color: #FFF;  display: table;
    dl{
      border-bottom: solid 1px #E0E0E0; overflow: hidden;
      dt{ width: 30%; float: left;}
      dd{ width: 70%; float: left;}
    }
    
    .innerTit{ font-size: 0.4rem; color: #333333; padding-bottom: .3rem;}
    .innerTips{ color: #d6d6d6;}
    .photoWrap{
      width: 90%; margin: 0 auto;
      
    }
    
  }
  .itemLabel{text-indent: 4%; font-size: 0.3rem;}
  .itemLabelRight{text-indent: 4%; text-align: right; font-size: 0.28rem;}
}


</style>  
