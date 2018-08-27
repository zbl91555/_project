<template>
	<div class="setData">
		<div class="userinfoBox sns unverified">
			<div class="userinfoItemSetData avatarItemSetData border horizonBottom">
				<div class="title paddingLeft">
					头像
				</div>
				<div class="info">
					<div class="avatar" :style="{backgroundImage: 'url(' + ShieldList.avatar + ')'}">
					<uploadImg isPath="setData" count=1 @upload="upload"></uploadImg>
					</div>
					<div v-if="headcantShow" class='headcant' @click="toast"></div>
				</div>
				<div class="arrow">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
			<!-- <router-link to="/nickName"> -->
            <div>
				<div  @click="nickName" class="userinfoItemSetData nicknameItem border horizonBottom">
					<div class="title paddingLeft">
						昵称
					</div>
					<div class="info">
						{{ShieldList.nickname}}
					</div>
					<div class="arrow">
						<i class="iconfont icon-right"></i>
					</div>
				</div>
				<div class="cantFath">
					<group label-width="5em" label-align="left" >
            <x-address @on-hide="logHide" style="font-size:14px;" class="area" title="地区" v-model="addressValue" :value="getName(addressValue)" raw-value :list="addressData" hide-district></x-address>
          </group>
          <div v-if="cantShow" class="cant" @click="toast"></div>
        </div>
            </div>
			<!-- <div class="userinfoItemSetData WeChat">
				<div class="title paddingLeft">
					使用微信头像昵称
				</div>
				<div class="info">
				</div>
				<div class="arrow">
					<i class="iconfont icon-right"></i>
				</div>
			</div> -->
		</div>
  <!-- 弹出弹框 -->
    <div id="fixednumMain" v-if="showshowlists">
      <div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
        <div class="sharesomedown">你已经是认证用户,昵称不可修改</div>
        <div class="know" @click="closeshowlists()">知道了 </div>
      </div>
    </div>
<!-- 选择照片 -->
    <div id="fixednumMain" v-if="selPic">
      <div @click="closeselPic()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomethings">
        <div style="font-size: 16px" class="sharesomedown" @click="takePhoto('camera')">拍照</div>
        <div style="font-size: 16px" class="sharesomedown" @click="takePhoto('album')">从相册选择</div>
        <div style="font-size: 16px" class="know" @click="closeselPic()">取消 </div>
      </div>
    </div>
    <!-- <group label-width="5em" label-align="left" >
        <x-address :title="title" v-model="addressValue"  raw-value :list="addressData" value-text-align="left" :value="getName(addressValue)"></x-address>
      </group> -->
	</div>
</template>
<script>
import { SettingInfo, settingCity, changeTheHeadImage } from '../../api/api'
import {
  Group,
  XAddress,
  ChinaAddressV4Data,
  XButton,
  Cell,
  Value2nameFilter as value2name
} from 'vux'
import wx from 'weixin-js-sdk'
import uploadImg from '../home/uploadImg'
import { Toast } from 'vant'
export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell,
    uploadImg
  },
  data () {
    return {
      ShieldList: {},
      pagenum: 10,
      page: 1,
      showshowlists: false,
      province: '',
      country: '',
      address: '',
      title: '选择地区',
      addressValue: [],
      addressData: ChinaAddressV4Data,
      showSuccess: false,
      toastText: '',
      selPic: false,
      avatar_edit: '',
      city_edit: '',
      nickname_edit: '',
      cantShow: false, // 地区遮罩
      headcantShow: false // 头像遮罩
    }
  },
  methods: {
    toast () {
      let nowTime = new Date()
      let now = Math.floor(nowTime.getTime() / 1000)
      if (this.ShieldList.is_company) {
        if (Math.floor(this.city_edit) + 86400 * 30 > now) {
          Toast('一月内只能修改一次')
        }
        if (Math.floor(this.avatar_edit) + 86400 * 30 > now) {
          Toast('一月内只能修改一次')
        }
      } else {
        if (Math.floor(this.city_edit) + 86400 * 7 > now) {
          Toast('一周内只能修改一次')
        }
        if (Math.floor(this.avatar_edit) + 86400 * 7 > now) {
          Toast('一周内只能修改一次')
        }
      }
    },
    defaultted () {
      let nowTime = new Date()
      let now = Math.floor(nowTime.getTime() / 1000)
      if (this.ShieldList.is_company) {
        if (
          this.city_edit == '' ||
          Math.floor(this.city_edit) + 86400 * 30 < now
        ) {
          this.cantShow = false
          this.headcantShow = false
        } else if (Math.floor(this.city_edit) + 86400 * 30 > now) {
          this.cantShow = true
          this.headcantShow = true
        }
        if (
          this.avatar_edit == '' ||
          Math.floor(this.avatar_edit) + 86400 * 30 < now
        ) {
          this.headcantShow = false
        } else if (Math.floor(this.avatar_edit) + 86400 * 30 > now) {
          this.headcantShow = true
        }
      } else {
        if (
          this.city_edit == '' ||
          Math.floor(this.city_edit) + 86400 * 7 < now
        ) {
          this.cantShow = false
          this.headcantShow = false
        } else if (Math.floor(this.city_edit) + 86400 * 7 > now) {
          this.cantShow = true
          this.headcantShow = true
        }
        if (
          this.avatar_edit == '' ||
          Math.floor(this.avatar_edit) + 86400 * 7 < now
        ) {
          this.headcantShow = false
        } else if (Math.floor(this.avatar_edit) + 86400 * 7 > now) {
          this.headcantShow = true
        }
      }
    },
    // 获取图片
    upload (list) {
      if (list.list.indexOf('wximg') > -1) {
        list.list = list.list.replace('wximg', 'mmopen')
      };
      console.log(list.list)
      this.ShieldList.avatar = list.list
      changeTheHeadImage(list.name)
        .then(res => {
          Toast('头像已上传成功')
        })
        .catch(error => {
          Toast(error.data.message)
        })
    },
    takePhoto (type) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    },
    SettingInfo () {
      SettingInfo()
        .then(res => {
          this.ShieldList = res.data
          this.addressValue.push(res.data.province)
          this.addressValue.push(res.data.city)
          this.avatar_edit = res.data.avatar_edit
          this.city_edit = res.data.city_edit
          this.nickname_edit = res.data.nickname_edit
          this.is_company = res.data.is_company
          this.defaultted()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    canselShielding (user_id) {
      let _this = this
      /* canselShielding(user_id).then(function(response) {
						if(response.code == 200) {
							console.log('取消屏蔽成功')
							_this.fanInfos();

						}
					})
					.catch(function(error) {
						console.log(error);
					}); */
    },
    nickName () {
      let nowTime = new Date()
      let now = Math.floor(nowTime.getTime() / 1000)
      if (this.ShieldList.is_company) {
        this.showshowlists = true
      } else {
        if (
          this.nickname_edit == '' ||
          Math.floor(this.nickname_edit) + 86400 * 7 < now
        ) {
          this.$router.push('/nickName/' + this.ShieldList.nickname)
        } else if (Math.floor(this.nickname_edit) + 86400 * 7 > now) {
          Toast('一周内只能修改一次')
        }
      }
    },
    // 关闭
    closeshowlists () {
      this.showshowlists = false
    },
    closeselPic () {
      this.selPic = false
    },
    getName (value) {
      let address = value2name(value, ChinaAddressV4Data)
      let addressArr = address.split(' ')
      this.province = addressArr[0]
      this.city = addressArr[1]
      this.country = addressArr[2]
      return value2name(value, ChinaAddressV4Data)
    },
    logHide (str) {
      let params = {
        province: this.province,
        city: this.city
      }
      if (str) {
        settingCity(params)
          .then(res => {
            this.cantShow = true
            this.SettingInfo()
          })
          .catch(err => {
            Toast(err.data.message)
          })
      }
    }
  },
  mounted () {
    this.SettingInfo()
  }
}
</script>

<style>
.setData .uploadOther {
  position: relative;
  z-index: 100;
}
</style>

<style>

.cantFath {
  position: relative;
}
.cant {
  position: absolute;
  width: 100%;
  height: 80px;
  z-index: 10;
  top: 0;
}
.scroller-component {
  height: 476px !important;
  overflow: hidden !important;
}
.scroller-item {
  font-size: 32px !important;
  height: 68px !important;
  line-height: 68px !important;
}
.scroller-mask {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  height: 100% !important;
  margin: 0 auto !important;
  width: 100% !important;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.6)
    ),
    linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)) !important;
  background-position: top, bottom !important;
  background-size: 100% 204px !important;
  background-repeat: no-repeat !important;
}
.scroller-indicator {
  width: 100% !important;
  height: 68px !important;
  position: absolute !important;
  left: 0 !important;
  top: 204px !important;
  z-index: 3 !important;
}
.weui-cells.vux-no-group-title {
  margin-top: 0;
  padding-left: 0.4rem;
}
.vux-popup-picker-select .vux-popup-picker-value.vux-cell-value {
  padding-right: 15px;
}
.weui-cell {
  padding: 0.133333rem 0 !important;
}
.weui-cell_access .weui-cell__ft:after {
  content: " ";
  display: inline-block;
  height: 0.2rem !important;
  width: 0.2rem !important;
  border-width: 0.046667rem 0.046667rem 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -0.026667rem;
  position: absolute;
  top: 50%;
  margin-top: -0.103333rem;
  right: 0.006667rem;
}
.vux-popup-picker-container .vux-popup-header.vux-1px-b {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
.setData {
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}

.setData .userinfoBox {
  width: 100%;
  border-left: none;
  border-right: none;
  padding-top: 20px;
}

.setData .userinfoBox.sns .userinfoItemSetData.avatarItemSetData {
  height: 168px;
}

.setData .userinfoBox .userinfoItemSetData {
  height: 100px;
  position: relative;
  line-height: 100px;
  color: #333;
  font-size: 28px;
  padding-left: 30px;
  cursor: pointer;
  background-color: #fff;
  overflow: hidden;
}

.setData .userinfoBox.sns .userinfoItemSetData.avatarItemSetData .title {
  height: 168px;
  line-height: 168px;
}

.setData .userinfoBox.sns .userinfoItemSetData .title {
  width: 42%;
  min-width: 135px;
  margin-left: 0;
}

.setData .userinfoBox .userinfoItemSetData .title {
  float: left;
  width: 23%;
  height: 100px;
  line-height: 100px;
  color: #333;
  font-size: 28px;
  margin-left: 0;
}

.setData .userinfoBox.sns .userinfoItemSetData.avatarItemSetData .info {
  height: 168px;
  position: relative;
}

.setData .uploaded {
  opacity: 0;
}
.setData .userinfoBox .userinfoItemSetData .info {
  float: left;
  height: 100px;
  line-height: 100px;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #999;
  word-break: break-all;
  width: 46%;
  text-align: right;
  font-size: 24px;
  margin-left: 30px;
}

.setData .userinfoBox.sns .userinfoItemSetData.avatarItemSetData .avatar {
  position: absolute;
  right: 4px;
  top: 28px;
  width: 113px;
  height: 113px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
.headcant {
  position: absolute;
  right: 4px;
  top: 28px;
  width: 113px;
  height: 113px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
  z-index: 110;
}
.setData .userinfoBox.sns .userinfoItemSetData.avatarItemSetData .avatar:after {
  border: 1px solid #ececec;
  content: "";
  width: 113px;
  height: 113px;
  display: block;
  padding: 3px;
  position: absolute;
  right: -4px;
  top: -4px;
}

.setData .userinfoBox .userinfoItemSetData .arrow .iconfont {
  position: absolute;
  top: 50%;
  right: 2%;
  height: 46px;
  color: #c8c8c8;
  margin-top: -23px;
  line-height: 46px;
  font-size: 32px;
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

.WeChat {
  margin-top: 18px;
}
.iconfont {
  margin: 0;
  font-size: 28px;
}
.sharesomething {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 200px;
  background: white;
  text-align: center;
}
.sharesomethings {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 300px;
  background: white;
  text-align: center;
}
.sharesomedown {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #f2f2f2;
  color: #a2a2a2;
}
.know {
  height: 100px;
  line-height: 100px;
  color: #b55459;
}
.area {
  height: 80px;
  line-height: 60px;
  padding: 0 25px 0 0;
  position: relative;
}
.rightArrow {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
</style>
