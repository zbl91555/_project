<template>
	<div class="Kojiin">
		<div>
			<div class="buyer-tool" :style="{backgroundImage: 'url(' + info.avatar + ')'}">
				<router-link  to="/">{{info.seller_name}}<i class="iconfont icon-right"></i></router-link>
			</div>
			<div class="border"></div>  
			<div class="buy-info">
				<div class="goods-info" :style="{backgroundImage: 'url(' + info.auction_img + ')'}"></div>
				<p class="goods-intr">{{info.auction_desc}}</p>
				<ul class="buyer-detail">
					<li>成交金额：￥{{info.price}}元</li>
					<li>截拍时间：<i>{{timestampToTime(parseFloat(info.end_time) + 86400 * 2)}}</i></li>
          <!-- <li><div style="float:left">截拍时间：</div><countDown style="width:80px;float:left" :endtime='parseFloat(info.end_time) + 86400 * 2' :dayShow='true' :secShow='false'></countDown></li> -->
				</ul>
			</div>	
		</div>
		<!-- <div class="somereason">
			<div class="inreason">介入原因<i>*</i></div>
			<div class="choosereason">
				<i>请选择介入原因</i>
				<i class="icon-jiantouxiangxia iconfont"></i>
			</div>
		</div> -->
    <div class="complaintTitle" @click="xiaShow()">
          <i>介入原因</i>
          <i v-if="show" class="iconfont icon-jiantouxiangxia"></i>
          <i v-if="hide" class="iconfont icon-jiantouxiangshang" @click.stop="shangShow()"></i>
          <i>{{showReason}}</i>
    </div>
      <form id="J_login_form" v-if="reason">
          <div class="login-frame">
              <ul>
                  <li  v-for="(list,index) in complaintContent" @click="pitch(list,index)" :key="index">
                      <p>
                          {{list.text}}
                      </p>
                      <div class="arrow" v-show ="list.pitchShow == true">
                          <i class="iconfont icon-finish"></i>
                      </div>
                  </li>
              </ul>
          </div> 
      </form>
		<div class="somereason">
			<div class="inreason">介入原因<i>*</i><span>(最多200字)</span></div>
		</div>
		<div class="border"></div>
		<div class="descBox">
        	<textarea maxlength="200" v-model="desc" placeholder="请您写明申请小二介入理由,方便小二进行判断"></textarea>
    	    <uploadImg count=3 @upload="upload" isPath="Kojiin"></uploadImg>
      </div>
    <!-- 是否提交  -->
    <div id="fixednumMain" v-if="subSmall">
      <div @click="closedeliverGoods()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
          <!-- <div class="deliverGoods" >是否要申请小二介入 ？</div> -->
          <div class="deliverGoods">是否以（{{showReason}}）申请小二介入？</div>
          <div @click="platformApplySmall()">确定</div> 
          <div @click="closedeliverGoods()">取消</div>        
      </div>
    </div>
		<div class="login-btn">
        	<button @click="platformApply" class="icon-btn">提交</button>
    	</div>
      <toast width="200px"  v-model="showPositionValue" type="text" :time="800" is-show-mask :text="textInner" :position="position"></toast>
	</div>
</template>
<script>
import countDown from "../../common/countDown";
import { getUpSign, platformView, platformApply } from "../../../api/api";
import { Toast } from "vux";
import uploadImg from "../../../components/home/uploadImg";
export default {
  components: {
    Toast,
    uploadImg,
    countDown
  },
  data() {
    return {
      complaintContent: [
        {
          text: "未收到货",
          pitchShow: true
        },
        {
          text: "收到商品破损",
          pitchShow: false
        },
        {
          text: "收到商品与描述不符",
          pitchShow: false
        },
        {
          text: "商品质量问题",
          pitchShow: false
        },
        {
          text: "其他",
          pitchShow: false
        }
      ],
      showReason: "请选择介入原因",
      pitchShow: "",
      show: true,
      hide: false,
      reason: false,
      info: {},
      order_id: "",
      title: "",
      desc: "",
      position: "",
      showPositionValue: false,
      textInner: "",
      subSmall: false,
      paltformImgAll: []
    };
  },
  methods: {
    upload(list) {
      console.log(list)
      this.paltformImgAll = list.data;
    },
    closedeliverGoods() {
      this.subSmall = false;
    },
    //弹框
    showPosition(position, textInner) {
      this.position = position;
      this.showPositionValue = true;
      this.textInner = textInner;
    },
    //勾选投诉原因
    pitch(list, index) {
      for (let i = 0; i < this.complaintContent.length; i++) {
        this.complaintContent[i].pitchShow = false;
      }
      list.pitchShow = true;
      this.title = list.text;
      this.reason = false;
      this.showReason = this.complaintContent[index].text;
    },
    xiaShow() {
      this.show = false;
      this.hide = true;
      this.reason = true;
    },
    shangShow() {
      this.show = true;
      this.hide = false;
      this.reason = false;
    },
    platformView() {
      let _this = this;
      this.order_id = this.$route.query.order_id;
      platformView(this.order_id)
        .then(res => {
          _this.info = res.data;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },

    platformApply() {
      console.log(this.paltformImgAll)
      if (this.title == "") {
        this.showPosition("middle", "请选择介入原因");
        return;
      }
      if (this.desc == "") {
        this.showPosition("middle", "请填写介入原因");
        return;
      }
      if (this.desc.length > 200) {
        this.showPosition("middle", "描述字数不能多于200个字");
        return;
      }
      if (this.paltformImgAll.length == 0) {
        this.showPosition("middle", "请上传图片");
        return;
      }
      this.subSmall = true;
    },
    platformApplySmall() {
      let params = {
        result: this.title,
        description: this.desc,
        platform_img_all: this.paltformImgAll
      };
      if (this.title == "") {
        this.showPosition("middle", "请选择介入原因");
        return;
      }
      if (this.desc == "") {
        this.showPosition("middle", "请填写介入原因");
        return;
      }
      if (this.desc.length > 200) {
        this.showPosition("middle", "描述字数不能多于200个字");
        return;
      }
      if (this.paltformImgAll.length == 0) {
        this.showPosition("middle", "请上传图片");
        return;
      }
      platformApply(this.order_id, params)
        .then(res => {
          this.subSmall = false;
          this.$router.push({
            name: "买家中心-订单详情",
            params: { order_id: this.order_id }
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  },
  mounted() {
    this.platformView();
  }
};
</script>

<style>
.Kojiin .uploadOther {
  position: absolute;
  bottom: 0;
  z-index: 10;
}
.Kojiin .icon-untitled44 {
  font-size: 0.6rem;
}
.Kojiin .addImg {
  bottom: 20px !important;
  line-height: 0.4rem !important;
}
.Kojiin .addImg p:last-child {
  font-size: 12px;
}
.Kojiin .el-upload--picture-card {
  padding-top: 0.1rem !important;
}
.Kojiin .img-ul .img-li {
  width: 138px !important;
  height: 138px !important;
}
</style>

<style lang="less" scoped>
.deliverGoods {
  color: #a5a5a5;
}
.sharesomething {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 280px;
  background: white;
  text-align: center;
}
.sharesomething div {
  height: 90px;
  line-height: 90px;
  font-size: 30px;
}
.sharesomething div:nth-child(2) {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  color: #9e2026;
  font-size: 32px;
}
.sharesomething div:nth-child(3) {
  font-size: 32px;
}
.Kojiin {
  padding-top: 20px;
  padding-bottom: 110px;
  width: 100%;
}
.buyer-tool {
  height: 76px;
  line-height: 76px;
  background-position: 30px center;
  background-repeat: no-repeat;
  background-size: 48px;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  a {
    margin-left: 50px;
    display: inline-block;
    line-height: 76px;
    float: left;
    position: relative;
    padding-right: 40px;
    i {
      margin: 0;
      font-size: 21px;
    }
  }
  button,
  i {
    float: right;
  }
  i {
    font-size: 32px;
    margin: 0;
  }
  .op {
    padding: 0 20px;
  }
  button {
    outline: none;
    border: none;
    background-color: #fff;
    color: #f15511;
    margin-top: 19px;
  }
}
.buy-info {
  height: 220px;
  background-color: white;
  padding: 27px 30px;
  box-sizing: border-box;
  position: relative;
  .goods-info {
    height: 166px;
    width: 166px;
    float: left;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 20px;
  }
  .goods-intr {
    float: left;
    width: 70%;
    height: 60px;
    line-height: 30px;
    margin-bottom: 10px;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #333;
  }
  .buyer-detail {
    position: absolute;
    width: 70%;
    left: 220px;
    bottom: 27px;
  }
  .buyer-detail li {
    height: 25px;
    line-height: 25px;
    background-color: transparent;
    padding: 0;
    color: #999;
    margin-top: 10px;
  }
}
.border {
  border: 1px solid #e5e5e5;
}
.somereason {
  margin-top: 20px;
  background: white;
  overflow: hidden;
  height: 60px;
  line-height: 60px;
  padding: 20px 40px;
}
.somereason .inreason {
  float: left;
  line-height: 60px;
  position: relative;
}
.somereason .inreason i {
  color: #a53c40;
  font-size: 48px;
  position: absolute;
  top: 10px;
  left: 100px;
}
.somereason .choosereason {
  float: right;
  line-height: 60px;
}
.icon-jiantouxiangxia {
  font-size: 24px;
  margin: 0;
}
.somereason .inreason span {
  margin-left: 40px;
  color: #999999;
}
.border {
  border: 1px solid #e5e5e5;
}
.descBox {
  position: relative;
  height: 408px;
  padding: 30px;
  background-color: #fff;
  box-sizing: border-box;
}
textarea {
  position: absolute;
  resize: none;
  outline: 0;
  height: 268px;
  font-size: 28px;
  border: 0px;
  width: 90%;
}
.wordsNum {
  position: absolute;
  width: 100px;
  right: 30px;
  bottom: 30px;
  color: #999;
  height: 25px;
  text-align: right;
  font-size: 20px;
  line-height: 25px;
}
/*上传样式*/
.el-col {
  width: auto;
}
.el-col:last-child {
  margin-left: 9px;
}
.el-upload--picture-card {
  width: 60px;
  height: 60px;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 65px;
  height: 65px;
  margin-right: 9px;
  margin-bottom: 9px;
}
.el-upload-list--picture-card .el-upload-list__item:nth-child(5) {
  margin-right: 0;
}
.upload .icon-untitled44,
.upload .icon-shipin {
  margin-top: 11px;
  font-size: 32px;
  margin: 0;
  color: #d2d2d2;
}

.upload .editMain .el-upload--picture-card {
  background-color: #fff !important;
  border: 1px solid #d2d2d2 !important;
  border-radius: 0.08rem;

  line-height: 0.6rem;
  padding-top: 22px;
}
.upload .editMain .el-upload--picture-card > div {
  font-size: 10px;
  color: #d2d2d2;
  margin-top: 8px;
}
.el-upload .el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-upload-dragger {
  width: 1.973333rem;
  height: 1.973333rem;
}
.uploadBorder {
  margin-top: -160px;
  margin-left: 20px;
}
.addPic {
  position: absolute;
  top: 0;
  height: 50px;
  left: 20px;
  color: #d2d2d2;
}
.addPic p:nth-child(2) {
  margin-top: -100px;
}
.elPosition {
  position: relative;
  border: 2px solid #d2d2d2;
}
.addadd {
  position: absolute;
  top: -40px;
  left: 55px;
}
.login-btn {
  padding: 0 30px;
  margin-top: 80px;
}
.login-btn .icon-btn {
  display: block;
  border: none;
  height: 82px;
  line-height: 82px;
  background: #9e2026;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  width: 100%;
  margin-top: 100px;
  outline: none;
  -webkit-appearance: none;
  font-size: 28px;
}
.complaintTitle {
  height: 87px;
  line-height: 87px;
  margin: 20px 30px 0px 30px;
  font-size: 24px;
  color: #999;
  overflow: hidden;
}
.complaintTitle i:nth-child(1) {
  font-size: 30px;
  color: black;
  float: left;
}
.complaintTitle i:nth-child(2) {
  font-size: 12px;
  float: right;
}
.complaintTitle i:nth-child(3) {
  float: right;
  padding-right: 20px;
}
.icon-jiantouxiangxia {
  margin: 0;
}
.icon-jiantouxiangshang {
  margin: 0;
}
#J_login_form {
  border-bottom: 2px solid #e5e5e5;
}
.login-frame {
  background-color: #fff;
}
.login-frame li {
  position: relative;
  display: flex;
  height: 110px;
  line-height: 110px;
  margin-left: 30px;
  padding-right: 30px;
  border-bottom: 2px solid #e5e5e5;
}
.login-frame li p {
  font-size: 28px;
  color: #666;
  width: 70%;
}
.arrow {
  position: absolute;
  right: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.arrow {
  color: #9e2026;
}
</style>