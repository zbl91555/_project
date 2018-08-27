<template>
    <div class="EnterpriseCertification">
      <div class="verifyProcessMain">
      <div class="title">
        企业实名认证流程
      </div>
      <div class="verifyContent">
        <div class="process">
          <div class="step">
            <div class="num">
              1
              <div class="pass" style="background-image: none;">
              </div>
            </div>
            <div class="stepContent">
              填写企业名称、法人姓名并上传企业营业执照清晰照片及法人身份证正面和反面清晰照。
            </div>
          </div>
          <div class="step">
            <div class="num">
              2
              <div class="pass" style="background-image: none;">
              </div>
            </div>
            <div class="stepContent">
              填写联系人真实姓名、联系电话、身份证号并上传身份证正面、反面和手持身份证的清晰照。
            </div>
          </div>
          <div class="step">
            <div class="num">
              3
              <div class="pass" style="background-image: none;">
              </div>
            </div>
            <div class="stepContent">
              设置店铺名称、店铺Logo、及店铺介绍。
            </div>
          </div>
          <div class="step">
            <div class="num">
              4
              <div class="pass" style="background-image: none;">
              </div>
            </div>
            <div class="stepContent">
              提交实名认证申请后，工作人员将在3个工作日内与您联系核对信息。
            </div>
          </div>
        </div>
      </div>
      <router-link to="/sellerCenter/enterpriseCertification">
      <div class="button">
        <button>我要认证</button>
      </div>
      </router-link>
      <div class="agreement">
        点击即表示同意<a href="#">《淘拍堂认证增值服务协议》</a>
      </div>
    </div>
    <router-view></router-view>
    </div>
</template>

<style scoped>
.EnterpriseCertification {
  background-color: #f4f4f4;
  width: 100%;
  min-height: 100vh;
  position: relative;
}
.EnterpriseCertification .verifyProcessMain {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow : hidden;
}
.EnterpriseCertification .verifyProcessMain .title {
  width: 100%;
  font-size: 34px;
  line-height: 160px;
  text-align: center;
  color: #666;
}
.EnterpriseCertification .verifyProcessMain .verifyContent {
  display: table;
  width: 100%;
  height: auto;
  font-size: 13px;
  color: #999;
}
.EnterpriseCertification .verifyProcessMain .verifyContent .process {
  width: 88%;
  margin: 15px 4% 0 8%;
}
.EnterpriseCertification .verifyProcessMain .verifyContent .process .step {
  position: relative;
  height: 120px;
  line-height: 40px;
  padding-left: 33px;
  border-left: 2px solid #169ADA;
}
.EnterpriseCertification .verifyProcessMain .verifyContent .process .step .num {
  position: absolute;
  width: 53px;
  height: 53px;
  left: -29px;
  top: 1px;
  border-radius: 50%;
  background-color: #169ADA;
  font-size: 17px;
  color: #FFFFFF;
  line-height: 53px;
  text-align: center;
}
.EnterpriseCertification .verifyProcessMain .verifyContent .process .step .num .pass {
  width: 18px;
  height: 18px;
  margin-left: 23px;
  margin-top: -17px;
  background-repeat: no-repeat;
  background-size: 18px;
  display: block;
}
.EnterpriseCertification .verifyProcessMain .verifyContent .process .step:last-child {
  border-left: 2px solid #EFEFF4;
}
.EnterpriseCertification .verifyProcessMain .button button {
  height: 88px;
  width: 90%;
  margin: 100px 5% 0 5%;
  background-color:#9e2026;
  border: 0;
  border-radius: 8px;
  color: #FFFFFF;
  text-align: center;
  line-height: 88px;
  font-size: 30px;
}
.EnterpriseCertification .verifyProcessMain .agreement {
  width: 90%;
  padding: 20px 5% 20px 5%;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #666;
}
.EnterpriseCertification .verifyProcessMain .agreement a {
  color: #999;
  text-decoration: none;
}
.EnterpriseCertification .verifyProcessMain.re .agreement {
  display: none;
}
.stepContent{
  font-size: 24px;
}
</style>
