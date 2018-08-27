<template>
  <div class="personalCertificate">
    <div class="verifyMain">
      <div class="verifyBox operator">
      <div>
          <div class="flowPath">
            <div style="color: #f15511;">企业信息</div>
            <div style="color: #f15511;">个人/店铺信息</div>
            <div>提交审核</div>
          </div>
          <div>
              <div class="somesquare">
              <div class="oneLine"></div>
               <div class="square">
                  <div class="dot"></div>
                  <div></div>
               </div>
               <div class="square">
                  <div class="greyDot"></div>
                  <div style="color:#d2d2d2;"></div>
               </div>
               <div class="square">
                  <div class="greyDots"></div>
                  <div style="color:#d2d2d2;"></div>
               </div>
          </div>
          </div>
        </div>
        <div class="title">
          实名认证<span class="small">(请上传真实的个人信息，认证通过后将无法修改)</span>
        </div>
        <div class="infoItem text border horizonBottom">
          <div class="liHead">
            姓名
          </div>
          <div class="liContent">
            <input type="text" class="input" name="name" placeholder="请输入真实的姓名" value="" v-model="name">
          </div>
          <div class="liFoot ">
          </div>
        </div>
        <div class="infoItem text border horizonBottom">
          <div class="liHead">
            身份证号
          </div>
          <div class="liContent">
            <input type="text" class="input" name="idCode" placeholder="请输入身份证号" maxlength="21" value="" v-model="cardid">
          </div>
          <div class="liFoot ">
          </div>
          <div class="switchCardTypeIcon">
            <i class="wptFM icon-fm-arrowright rotate90"></i>
          </div>
        </div>
        <div class="infoItem text last">
          <div class="liHead">
            联系电话
          </div>
          <div class="liContent telephone">
            <div class="telephone" data-telephone="17621587756">
              <input onfocus="this.blur();" @click="telmobile" type="text" name="" class="input" placeholder="请输入联系电话" v-model="mobile">
              <i v-if="mobileVeri" style="position: absolute;color:#999;">号码已验证</i>
            </div>
          </div>
          <div class="liFoot">
          </div>
        </div>
        <div class="tips">
          请填写有效电话，工作人员将会致电核实材料
        </div>
        <div class="infoItem text last">
          <div class="liHead">
            店铺Logo
          </div>
          <div class="liContent">
            <div type="text" class="input" name="name"  value=""></div>
          </div>
          <div class="logoBackground" :style="{backgroundImage: 'url('+ imgUrl4 +')',backgroundSize:'contain'}">
            <uploadImg data-id=1 indexs=4 count=1 @upload="upload4" isPath="personalCertificate"></uploadImg>
          </div>
          <div class="iconfont icon-right">
          </div>
        </div>
        <div class="tips">
          推荐Logo尺寸512*512
        </div>
        <div class="infoItem text last">
          <div class="liHead">
            店铺名称
          </div>
          <div class="liContent">
            <input type="text" class="input" name="name" placeholder="请输入店铺名称" value="" v-model="info">
          </div>
          <div class="liFoot ">
          </div>
        </div>
        <div class="tips">
          认证后店铺名称将无法修改请慎重！
        </div>
      </div>
      <div class="verifyBox operatorPhoto">
        <div class="infoItem photo">
          <div class="liHead">
            身份证正面照
            <p class="">
              请用手机横向拍摄以保证图片正常显示
            </p>
          </div>
          <div class="liContent"  :style="{backgroundImage: 'url('+ imgUrl1 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传身份证正面照
            <uploadImg data-id=1 indexs=1 count=1 @upload="upload1" isPath="personalCertificate"></uploadImg>
          </div>
          <i  class="uploadingTipes">照片必须清晰哟！</i>
          <div class="cover ">
          </div>
        </div>
        <div class="infoItem photo">
          <div class="liHead">
            身份证反面照
            <p class="">
              请用手机横向拍摄以保证图片正常显示
            </p>
          </div>
          <div class="liContent"  :style="{backgroundImage: 'url('+ imgUrl2 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传身份证反面照
            <uploadImg data-id=2 indexs=2 count=1 @upload="upload2" isPath="personalCertificate"></uploadImg>
          </div>
          <div class="cover ">
          </div>
        </div>
        <div class="infoItem photo last">
          <div class="liHead">
            手持身份证照
            <p class="">
              拍照时请对焦在证件上(屏幕上对着身份证按一下)
            </p>
          </div>
          <div class="liContent hold"  :style="{backgroundImage: 'url('+ imgUrl3 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传手持身份证照
            <uploadImg data-id=3 indexs=3 count=1 @upload="upload3" isPath="personalCertificate"></uploadImg>
          </div>
          <div class="cover ">
          </div>
        </div>
        <div class="tips confirm">
          <div>
            请确认以上信息准确无误
          </div>
        </div>
      </div>
      <div class="buttonBanner"><button class="next" @click="CompanyPerson">下一步</button><i class="reminder">{{reminder}}</i></div>
    </div>
    <!-- 是否弹出验证 -->
    <div id="fixednumMain" v-if="showveri">
      <div @click="closeshowveri()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="telsharesomething">
        <form class="main">
          <div class="list">
            <div class="list-detail">
              <p>手机号</p>
              <input autofocus type="text" v-model="phone" placeholder="输入手机号"/>
              <span @click="filterNum()">{{msgg}}</span>
            </div>
          </div>
          <div class="list">
            <div class="list-detail">
              <p>验证码</p>
              <input type="text" v-model="num" placeholder="输入验证码"/>
            </div>
          </div>
          <div class="mobileAlert">{{mobileAlert}}</div>
          <div class="sub">
            <span :class="num==''?'spanBac':'spanBack'" @click="subMethod()">下一步</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Toast } from 'vant'
import enterpriseCertification from './enterpriseCertification'
import {
  CompanyViewPage,
  CompanyPerson,
  filterNum,
  subMethod
} from '../../../api/api'
import uploadImg from '../../home/uploadImg'
export default {
  name: 'enterprisePersonCertification',
  data () {
    return {
      importFileUrl: '',
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      info: '',
      name: '',
      mobile: '',
      cardid: '',
      msg: {},
      cardid_pic1: '',
      cardid_pic2: '',
      cardid_pic3: '',
      shop_logo: '',
      nickname: '',
      reminder: '',
      imgUrl1: require('../../../assets/images/front.png'),
      imgUrl2: require('../../../assets/images/theBack.png'),
      imgUrl3: require('../../../assets/images/handCard.png'),
      imgUrl4: require('../../../assets/images/dianpulogo.png'),
      showveri: false, // 手机号验证
      filterTime: '60',
      msgg: '获取验证码',
      flag: true, // 获取验证码开关
      phone: '', // 发送短信手机号码
      type: '2', // 获取验证码类型
      _key: '', // 获取到的验证码
      num: '', // 输入的验证码
      mobileVeri: false,
      mobileAlert: '',
      mobile_edit: '',
      nextflag: true
    }
  },
  components: {
    uploadImg
  },
  methods: {
    // wximg图片切换
    wximgChange (list) {
      if (list.indexOf('wximg') > -1) {
        // list = list.replace('wximg','verify');
      }
      return list
    },
    // 企业信息数据填充
    DataFilling (params) {
      this.company_name = params.company_name || ''
      this.company_permit = params.company_permit || ''
      this.company_person_cardid = params.company_person_cardid || ''
      this.company_person_name = params.company_person_name || ''
      this.company_person_pic1 = params.company_person_pic1 || ''
      this.company_person_pic2 = params.company_person_pic2 || ''
      this.company_pic = params.company_pic || ''
      this.type = params.type || ''
    },
    // 店铺信息填充
    storeInformation (params) {
      this.name = params.name || ''
      this.info = params.nickname || ''
      this.mobile = params.mobile || ''
      this.cardid = params.cardid || ''
      this.cardid_pic1 = params.cardid_pic1 || ''
      this.cardid_pic2 = params.cardid_pic2 || ''
      this.cardid_pic3 = params.cardid_pic3 || ''
      this.shop_logo = params.shop_logo || ''
      this.imgUrl1 = params.imgUrl5
      this.imgUrl2 = params.imgUrl6
      this.imgUrl3 = params.imgUrl7
      this.imgUrl4 = params.imgUrl8
    },
    upload1 (list) {
      let data = this.wximgChange(list.list)
      this.imgUrl1 = data
      console.log(list, 1)
      this.cardid_pic1 = list.name
    },
    upload2 (list) {
      console.log(list, 2)
      let data = this.wximgChange(list.list)
      this.imgUrl2 = data
      this.cardid_pic2 = list.name
    },
    upload3 (list) {
      console.log(list, 3)
      let data = this.wximgChange(list.list)
      this.imgUrl3 = data
      this.cardid_pic3 = list.name
    },
    upload4 (list) {
      console.log(list, 3)
      let data = this.wximgChange(list.list)
      this.imgUrl4 = data
      this.shop_logo = list.name
    },
    // 页面加载
    CompanyViewPage () {
      CompanyViewPage()
        .then(res => {
          this.mobile = res.data.mobile
          this.mobile_edit = res.data.mobile_edit
          if (this.mobile != '') {
            this.mobileVeri = true
          } else {
            this.mobileVeri = false
          }
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    CompanyPerson () {
      let params = {
        type: 'business',
        company_name: this.msg.company_name,
        company_person_name: this.msg.company_person_name,
        company_person_cardid: this.msg.company_person_cardid,
        company_pic: this.company_pic,
        company_person_pic1: this.company_person_pic1,
        company_person_pic2: this.company_person_pic2,
        company_permit: this.company_permit,
        name: this.name,
        nickname: this.info,
        mobile: this.mobile,
        cardid: this.cardid,
        cardid_pic1: this.cardid_pic1,
        cardid_pic2: this.cardid_pic2,
        cardid_pic3: this.cardid_pic3,
        shop_logo: this.shop_logo
      }
      // 复制提交的数据
      let sessionParams = {
        ...params,
        imgUrl5: this.imgUrl1,
        imgUrl6: this.imgUrl2,
        imgUrl7: this.imgUrl3,
        imgUrl8: this.imgUrl4
      }
      // 数据保存
      localStorage.setItem('storeInformation', JSON.stringify(sessionParams))
      if (this.nextflag) {
        this.nextflag = false
        CompanyPerson(params)
          .then(res => {
            this.nextflag = true
            this.$router.push({ name: 'enterpriseCertiPay' })
          })
          .catch(err => {
            console.log(err)
            this.nextflag = true
            if (err.data.code == 422) {
              this.reminder = '*' + err.data.message
            }
            if (err.data.code == 400) {
              this.reminder = '*' + err.data.message
            }
          })
      }
    },
    telmobile () {
      this.showveri = true
    },
    closeshowveri () {
      this.showveri = false
    },
    filterNum: function () {
      let _this = this
      let nowTime = new Date()
      let now = Math.floor(nowTime.getTime() / 1000)
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(_this.phone)) {
        alert('请输入正确的手机号')
        return false
      }
      if (
        this.mobile_edit != '' &&
        Math.floor(this.mobile_edit) + 86400 * 7 > now
      ) {
        this.mobileAlert = '号码一周只可修改一次'
      } else {
        if (_this.flag == true) {
          _this.flag = false
          let t = setInterval(function () {
            _this.filterTime--
            if (_this.filterTime <= 0) {
              clearInterval(t) // 当倒计时时间小于0时，清除时间函数并且将时间开关打开
              _this.flag = true
              _this.msgg = '获取验证码'
            } else {
              _this.msgg = '重新发送(' + _this.filterTime + ')' // 返回最初状态；
            }
          }, 1000)
          _this.filterTime = '60'
          let type
          if (this.mobile == '') {
            type = 1
          } else {
            type = 3
          }
          let params = {
            phone: _this.phone,
            type: type
          }
          filterNum(params)
            .then(function (res) {
              _this._key = res.data.key
            })
            .catch(function (err) {
              Toast(err.data.message)
            })
        }
      }
    },
    subMethod: function () {
      if (this.Trim(this.phone, 'g') == '') {
        Toast('手机号不能为空')
        return
      }
      if (this.Trim(this.num, 'g') == '') {
        Toast('请正确输入你收到的验证码')
        return
      }
      if (!this._key) {
        Toast('请先获取验证码')
        return
      }
      let params = {
        verification_key: this._key,
        verification_code: this.num,
        type: 3
      }
      subMethod(params)
        .then(res => {
          this.showveri = false
          this.mobile = this.phone
        })
        .catch(function (err) {
          Toast(err.data.message)
        })
    }
  },
  created () {
    // 企业信息数据填充
    let enterpriseRealName = localStorage.getItem('enterpriseRealName')
    if (enterpriseRealName) {
      let data = JSON.parse(enterpriseRealName)
      this.DataFilling(data)
    }
    // 店铺信息数据填充
    let storeInformation = localStorage.getItem('storeInformation')
    if (storeInformation) {
      let data = JSON.parse(storeInformation)
      this.storeInformation(data)
    }
    window.scrollTo(0, 0)
  },
  mounted () {
    this.msg = this.$store.state.params
    this.CompanyViewPage()
  }
}
</script>

<style>
.mobileAlert {
  text-align: center;
  margin-top: 5px;
  color: #f15511;
}
.personalCertificate .uploadOther {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.personalCertificate .uploaded {
  opacity: 0;
}
.personalCertificate .el-col {
  width: 100%;
}
.personalCertificate .img-ul {
  width: 100%;
}
.personalCertificate .img {
  width: 100%;
}
.personalCertificate #imgli {
  width: 100%;
}
.personalCertificate #label {
  height: 0.9rem !important;
  width: 100% !important;
}
</style>

<style scoped>
.telsharesomething {
  position: fixed;
  left: 5%;
  top: 35%;
  z-index: 1100;
  width: 90%;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  padding-top: 20px;
}
.telsharesomething .main {
  overflow: hidden;
  margin-top: 0;
}
.telsharesomething .sub {
  height: 88px;
  margin-top: 50px;
  padding: 0 30px;
}
.telsharesomething .sub span {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 88px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 28px;
}
.telsharesomething .sub .spanBac {
  background: #d2d2d2;
}
.telsharesomething .sub .spanBack {
  background: #9e2026;
}
.telsharesomething .main .list {
  background-color: #fff;
  padding-left: 30px;
  height: 100px;
}
.telsharesomething .main .list.last .list-detail {
  border-bottom: none;
}
.telsharesomething .main .list .list-detail {
  border-bottom: 1px solid #d2d2d2;
  box-sizing: border-box;
  height: 101px;
  width: 100%;
  float: left;
  position: relative;
}
.telsharesomething .main .list p {
  line-height: 100px;
  width: 160px;
  color: #000;
  font-size: 28px;
  float: left;
}
.telsharesomething .main .list input {
  display: block;
  width: 75%;
  height: 90px;
  margin-top: 5px;
  color: #999;
  font-size: 24px;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  float: left;
}
.telsharesomething .main .list .list-detail span {
  display: block;
  width: 174px;
  height: 60px;
  border-radius: 30px;
  background-color: #9e2026;
  line-height: 60px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.flowPath {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 40px 60px 20px 60px;
}
.somesquare {
  padding-bottom: 60px;
  margin: 0 100px;
  position: relative;
}
.oneLine {
  border: 1px solid #f15511;
  width: 50%;
}
.square {
  width: 33%;
  border-top: 1px solid #d2d2d2;
  position: relative;
  text-align: center;
  padding-top: 50px;
  float: left;
}
.square div:nth-child(2) {
  font-size: 36px;
  color: #f15511;
}
.square div:nth-child(3) {
  color: #a9a9a9;
}
.dot {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #f15511;
  position: absolute;
  left: 0;
  top: -15px;
}
.greyDot {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #f15511;
  position: absolute;
  left: 45%;
  top: -15px;
}
.greyDots {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #d2d2d2;
  position: absolute;
  right: 0;
  top: -15px;
}
.personalCertificate {
  position: relative;
  box-sizing: border-box;
  min-height: 300vh;
  background-color: #f4f4f4;
  max-width: 750px;
  padding-bottom: 100px;
}
.personalCertificate .verifyMain .verifyBox {
  width: 100%;
  display: table;
}
.personalCertificate .verifyMain .verifyBox.operator {
  background-color: #fff;
}
.personalCertificate .verifyMain .verifyBox .title {
  display: block;
  padding-left: 30px;
  background-color: #eee;
  color: #333;
  line-height: 100px;
  font-size: 24px;
}

.personalCertificate .verifyMain .verifyBox .infoItem {
  position: relative;
  height: 110px;
  width: 90%;
  margin-left: 30px;
  font-size: 28px;
  line-height: 110px;
  padding: 10px 5% 10px 0;
}

.personalCertificate .verifyMain .verifyBox .title span.small {
  font-size: 20px;
}
.personalCertificate .verifyMain .verifyBox .infoItem .liHead {
  width: 30%;
  float: left;
}
.personalCertificate .verifyMain .verifyBox .infoItem .liContent {
  width: 50%;
  float: left;
}
.personalCertificate .verifyMain .verifyBox .infoItem .liFoot {
  width: 10%;
  height: 28px;
  float: left;
}
.personalCertificate .verifyMain .verifyBox .infoItem .liContent .input,
.personalCertificate .verifyMain .verifyBox .infoItem .liContent .numInput {
  border: 0;
  font-size: 28px;
  height: 110px;
  float: left;
  width: 100%;
  outline: none;
  font-style: normal;
  font-family: inherit;
  vertical-align: baseline;
}
.border.horizonBottom:after {
  left: 0;
  bottom: 0;
}
.border.horizonTop:after,
.border.horizonBottom:after {
  width: 100%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.border:after {
  position: absolute;
  content: "";
  background-color: #d9d9d9;
}

.personalCertificate .uploadingPic {
  position: relative;
  width: 80%;
  height: 74px;
  background-color: #f15511;
  border-radius: 37px;
  float: left;
  text-align: center;
  color: #fff;
  line-height: 74px;
  margin: 57px 10% 10px;
}
.personalCertificate .uploadingTipes {
  height: 23px;
  font-size: 24px;
  line-height: 23px;
  color: #999999;
  float: left;
  text-align: center;
  width: 100%;
}
.personalCertificate .verifyMain .verifyBox .infoItem.photo {
  background-color: #fff;
  height: 10.6rem;
  padding: 73px 5%;
  margin: 0 0 20px;
  position: relative;
}

.personalCertificate .verifyMain .verifyBox .tips {
  padding: 5px 5% 10px 5%;
  color: #666;
  background-color: #f4f4f4;
  line-height: 80px;
  font-size: 22px;
  text-align: right;
}
.personalCertificate .verifyMain .verifyBox .infoItem.photo .liHead {
  position: relative;
  border: 0;
  padding: 0;
  width: 100%;
  font-size: 34px;
  line-height: 36px;
  color: #333;
  background-color: #fff;
}
.personalCertificate .verifyMain .verifyBox .infoItem .liHead {
  width: 30%;
  float: left;
}
.personalCertificate .verifyMain .verifyBox .infoItem.photo .liContent {
  width: 100%;
  height: 496px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 3px;
  background-color: #fff;
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}
.personalCertificate .verifyMain .verifyBox .infoItem.photo .cover {
  position: absolute;
  top: 53px;
  width: 90%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(/res/img/cover.png);
  background-size: contain;
  background-color: transparent;
  z-index: 999;
}
.personalCertificate .verifyMain .verifyBox .infoItem.photo .liHead p {
  line-height: 36px;
  font-size: 24px;
  margin-top: 27px;
  color: #999;
}
.personalCertificate .verifyMain .verifyBox .tips.confirm div {
  text-align: center;
  margin-bottom: 75px;
  font-size: 24px;
  color: #999;
}
.personalCertificate .verifyMain .buttonBanner button {
  border: 0;
  width: 90%;
  color: #fff;
  height: 88px;
  font-size: 30px;
  line-height: 88px;
  text-align: center;
  border-radius: 3px;
  margin: 0px 5% 15px 5%;
  background-color: #9e2026;
}
.logoBackground {
  background-image: url("../../../assets/images/dianpulogo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 110px;
  height: 110px;
  float: left;
  overflow: hidden;
  position: relative;
}
.icon-right {
  margin: 0;
  width: 20px;
  margin-left: 5px;
  color: #999;
}
.reminder {
  margin-left: 5%;
  color: red;
}
</style>
