<template>
  <div class="personalCertificate">
    <div class="verifyMain">
      <div class="verifyBox operator">
        <div>
          <div class="flowPath">
            <div style="color: #f15511;">企业信息</div>
            <div>个人/店铺信息</div>
            <div>提交审核</div>
          </div>
          <div>
              <div class="somesquare">
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
            企业名称
          </div>
          <div class="liContent">
            <input type="text" class="input" name="name" placeholder="请输入企业名称" value="" v-model="company_name">
          </div>
          <div class="liFoot ">
          </div>
        </div>
        <div class="infoItem text border horizonBottom">
          <div class="liHead">
            法人姓名
          </div>
          <div class="liContent">
            <input type="text" class="input" name="name" placeholder="请输入真实的姓名" value="" v-model="company_person_name">
          </div>
          <div class="liFoot ">
          </div>
        </div>
        <div class="infoItem text border horizonBottom">
          <div class="liHead">
            身份证号
          </div>
          <div class="liContent">
            <input type="text" class="input" name="idCode" placeholder="请输入身份证号" maxlength="21" value="" v-model="company_person_cardid">
          </div>
          <div class="liFoot ">
          </div>
          <div class="switchCardTypeIcon">
            <i class="wptFM icon-fm-arrowright rotate90"></i>
          </div>
        </div>
      </div>
      <div class="verifyBox operatorPhoto">
        <div class="infoItem photo">
          <div class="liHead">
            营业执照副本照片
            <p class="">
              上传营业执照照片
            </p>
          </div>
          <div class="liContent" :style="{backgroundImage: 'url('+ imgUrl1 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传营业执照副本照片
            <uploadImg data-id=1 indexs=1 count=1 @upload="upload1" isPath="personalCertificate"></uploadImg>
          </div>
          <i  class="uploadingTipes">照片必须清晰哟！</i>
          <div class="cover ">
          </div>
        </div>
        <div class="infoItem photo">
          <div class="liHead">
            法人身份证正面照
            <p class="">
              请用手机横向拍摄以保证图片正常显示
            </p>
          </div>
          <div class="liContent" :style="{backgroundImage: 'url('+ imgUrl2 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传法人身份证正面照
            <uploadImg data-id=2 indexs=2 count=1 @upload="upload2" isPath="personalCertificate"></uploadImg>
          </div>
          <div class="cover ">
          </div>
        </div>
        <div class="infoItem photo last">
          <div class="liHead">
            法人身份证反面照
            <p class="">
              请用手机横向拍摄以保证图片正常显示
            </p>
          </div>
          <div class="liContent hold" :style="{backgroundImage: 'url('+ imgUrl3 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传法人身份证反面照
            <uploadImg data-id=3 indexs=3 count=1 @upload="upload3" isPath="personalCertificate"></uploadImg>
          </div>
          <div class="cover ">
          </div>
        </div>
        <div class="infoItem photo last">
          <div class="liHead">
            食品流通许可证/食品经营许可证(可选)
            <p class="">
              茶酒滋补分类需上传此证件
            </p>
          </div>
          <div class="liContent hold" :style="{backgroundImage: 'url('+ imgUrl4 +')',backgroundSize:'contain'}">
          </div>
          <div class="uploadingPic">
            上传食品流通许可证
            <uploadImg data-id=3 indexs=4 count=1 @upload="upload4" isPath="personalCertificate"></uploadImg>
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
      <div class="buttonBanner">
         <button class="next" @click="getPersonCompanyMsg()">下一步</button>
        <i class="reminder">{{reminder}}</i>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import uploadImg from '../../home/uploadImg'
export default {
  name: 'enterpriseCertification',
  data () {
    return {
      importFileUrl: '',
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      info: '',
      company_name: '',
      company_person_name: '',
      company_person_cardid: '',
      company_pic: '',
      company_person_pic1: '',
      company_person_pic2: '',
      company_permit: '',
      reminder: '',
      imgUrl1: require('../../../assets/images/businessLicence.png'),
      imgUrl2: require('../../../assets/images/front.png'),
      imgUrl3: require('../../../assets/images/theBack.png'),
      imgUrl4: require('../../../assets/images/licence.png')
    }
  },
  components: {
    uploadImg
  },
  methods: {
    // wximg图片切换
    wximgChange (list) {
      if (list.indexOf('wximg') > -1) {
        list = list.replace('verify')
      }
      return list
    },
    // 数据填充
    DataFilling (data) {
      this.company_name = data.company_name
      this.company_person_name = data.company_person_name
      this.company_person_cardid = data.company_person_cardid
      this.company_pic = data.company_pic
      this.company_person_pic1 = data.company_person_pic1
      this.company_person_pic2 = data.company_person_pic2
      this.company_permit = data.company_permit
      this.imgUrl1 = data.imgUrl1
      this.imgUrl2 = data.imgUrl2
      this.imgUrl3 = data.imgUrl3
      this.imgUrl4 = data.imgUrl4
    },
    upload1 (list) {
      let data = this.wximgChange(list.list)
      this.imgUrl1 = data
      this.company_pic = list.name
    },
    upload2 (list) {
      this.company_person_pic1 = list.name
      let data = this.wximgChange(list.list)
      this.imgUrl2 = data
    },
    upload3 (list) {
      this.company_person_pic2 = list.name
      let data = this.wximgChange(list.list)
      this.imgUrl3 = data
    },
    upload4 (list) {
      this.company_permit = list.name
      let data = this.wximgChange(list.list)
      this.imgUrl4 = data
    },
    getPersonCompanyMsg () {
      let card = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\d{3}(x|X))|(\d{4}))$/
      if (this.company_name == '') {
        this.reminder = '*企业名称不能为空'
        return
      }
      if (this.company_person_name == '') {
        this.reminder = '*法人姓名不能为空'
        return
      }
      if (!card.test(this.company_person_cardid)) {
        this.reminder = '*身份证号格式错误'
        return
      }
      this.$router.push('/enterprisePersonCertification')
      let params = {
        type: 'business',
        company_name: this.company_name,
        company_person_name: this.company_person_name,
        company_person_cardid: this.company_person_cardid,
        company_pic: this.company_pic,
        company_person_pic1: this.company_person_pic1,
        company_person_pic2: this.company_person_pic2,
        company_permit: this.company_permit
      }
      let sessionParams = {
        ...params,
        imgUrl1: this.imgUrl1,
        imgUrl2: this.imgUrl2,
        imgUrl3: this.imgUrl3,
        imgUrl4: this.imgUrl4
      }
      localStorage.setItem('enterpriseRealName', JSON.stringify(sessionParams))
      this.$store.commit('getPersonCompanyMsg', params)
    }
  },
  created () {
    // 获取保存至session的数据
    let enterpriseRealName = localStorage.getItem('enterpriseRealName')
    if (enterpriseRealName) {
      let data = JSON.parse(enterpriseRealName)
      this.DataFilling(data)
    }
  }
}
</script>

<style>
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
.flowPath {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 40px 60px 20px 60px;
}
.somesquare {
  padding-bottom: 60px;
  margin: 0 100px;
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
  background: #d2d2d2;
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
  /*max-width: 750px;*/
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
.reminder {
  margin-left: 5%;
  color: red;
}
</style>
