<template>
	<div class="release firstStep"  ref="release" v-cloak>
	<div v-show="isProtocolCover" id="release" ref="isProtocolCover" style="width : 100%">
		<div id="fixednumMain" v-if="mobileVeri">
			<div @click.stop="closeCover" class="fixednumMask" style="opacity: 0.38;"></div>
		</div>
		<div class="upload" v-show="basicSetup">
				<div class="topBanner">
					<div class="btn draft" @click.stop="saveDraft">存为草稿</div>
					<div class="btn next" @click.stop="nextStep">下一步</div>
				</div>
				<div class="editMain">
					<form enctype="multipart/form-data">
						<div class="desc">
								<div class="weui-cells weui-cells_form">
									<div class="weui-cell">
										<div class="weui-cell__bd">
											<textarea class="weui-textarea" v-model="desc" placeholder="请输入描述信息" rows="3"></textarea>
											<div class="weui-textarea-counter"><span></span></div>
										</div>
									</div>
								</div>
						</div>
						<uploadImg :videoSet="videoSet" :imgSet="imgSet" :count="count" @upload="upload" isPath="uploads"></uploadImg>
					</form>
				</div>
					<div class="agreeBanner">
						发布即表示同意
						<div @click.stop="go">《淘拍堂竞拍服务协议》</div>
					</div>
			</div>
	</div>
		  <router-view></router-view>
	</div>
</template>
<script>
import {
  getPublishStep1,
  myUpload,
  saveDraft,
  getUpSign,
  getSign,
  getLoginMobileCode,
  submissionCode,
  rejoinTheShelves
} from "../../api/api";
import { Toast } from "vant";
import { Actionsheet } from "vux";
import uploadImg from "./uploadImg";
import { mapState } from "vuex";
import assign from "../../assets/js/assign"; //混入式方法
import biddingAgreement from "./biddingAgreement"; //协议

export default {
  mixins: [assign],
  name: "upload",
  components: {
    biddingAgreement,
    uploadImg,
    Toast
  },
  data() {
    return {
      textLength: 0, //字符串长度
      basicSetup: true,
      goodsId: "", //商品id
      isVerify: false, //  是否认证
      showSuccess: false,
      toastText: "",
      /*value 在组件中的值*/
      val: "",
      aIllegal: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "0..",
        "."
      ],
      cursorDuration: 600,
      bodyHeight: "",
      bodyOverflow: "",
      middleType: "",
      imgSet: [],
      count: 9,
      dataInfo: {}, //tabBar提交的数据

      // 提交信息相关data
      desc: "", //描述
      imgList: [],
      videoUri: "",

      // 高级设置相关data
      advancedSettings: false,
      isReturn: false, //7天包退  0否 1是
      freeShip: true, //包邮 1是 2否
      securitymoney: false, //选择缴纳保证金
      videoSet: "",
      mobileVeri: false,
      throttle: false,
      sessionData: {},
      uploadInfo: {},
      disk: ""
    };
  },
  created() {
    this.userifon();
    //获取session中的数据
    this.desc = localStorage.getItem("desc") || "";
  },
  computed: {
    ...mapState({
      uploadImageParams: state => state.uploadImageParams
    }),
    isProtocolCover() {
      return this.$store.state.isProtocol;
    }
  },
  props: {
    value: "",
    inter: {
      default: 8
    },
    decimal: {
      default: 2
    }
  },
  //离开时 数据清除
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    go() {
      this.$store.commit("reviseProtocolClose", false);
      this.$router.push("/upload/biddingAgreement");
    },
    //上传回调
    upload(list) {
      if (list.name === "img") {
        this.imgList = list.data;
        this.uploadInfo = list;
      } else {
        this.videoUri = list.videoUri;
      }
    },
    //发布错误处理
    error(error) {
      this.throttle = false;
      //判断返回的状态码
      if (error.status == 422 || error.status == 400) {
        Toast(error.data.message);
      } else if (error.status == 402) {
        //连续发送三次请求
        if (this.releaseCount <= 3) {
          this.release();
          this.releaseCount++;
        }
      } else if (error.status == 403) {
        if (error.data.code == 40002) {
          this.$router.push("/errorPage?type=40002");
          sessionStorage.setItem("err", JSON.stringify(error.data));
        }
      }
    },
    //数据填充
    dataFilling(res) {
      let data = res.data;
      this.desc = data.sale.content || "";
      let imgSet = [];
      let i = 0;
      for (let index = 0; index < data.sale.imgList.length; index++) {
        imgSet.push({ id: i++, imgUrl: data.sale.imgList[index] });
      }
      this.imgSet = imgSet || [];
      this.videoSet = res.data.sale.videoUri || "";
    },
    //协议
    isProtocol() {
      this.$store.commit("reviseProtocolClose", true);
    },
    // 获取用户信息
    userifon() {
      let params = this.$route.params.id;
      if (params) {
        localStorage.setItem("goodsId", params);
      };
      let uploadInfo = localStorage.getItem('uploadInfo');
      !uploadInfo && getPublishStep1(params)
        .then(res => {
          // this.isVerify = res.data.shop.isVerify;
          this.categoryListes = res.data.categoryList;
          //获取上架发送的数据
          if (this.$route.params.id) {
            this.obj = this.$route.params.id;
            this.dataFilling(res);
          }
        })
        .catch(error => {
          console.log(error);
          this.error(error);
        });
    },
    // 下一步
    nextStep() {
      if (!this.desc) {
        Toast("描述不能为空");
        return false;
      } else if (this.imgList.length == 0) {
        Toast("图片不能为空");
      }
      if (this.throttle) {
        return;
      }
      this.throttle = true;
      let params = {
        content: this.desc,
        imgList: this.imgList,
        videoUri: this.videoUri,
        status: 0
      };
      this.uploadInfo.videoUri = this.videoUri;
      localStorage.setItem("uploadInfo", JSON.stringify(this.uploadInfo));
      localStorage.setItem("desc", this.desc);
      let id = localStorage.getItem("goodsId") || "";
      let active = this.$route.query.active; //活动发布
      if (active) {
        params.active = active
      }
      saveDraft(params, id)
          .then(res => {
            this.throttle = false;
            localStorage.setItem("goodsId", res.data.goodsId);
            if (active) {//活动下一步
              this.$router.push("/nextUpload/" + res.data.goodsId + '/' + active);
            }else {
              this.$router.push("/nextUpload/" + res.data.goodsId);
            }
          })
        .catch(err => {
          this.throttle = false;
          console.log(err);
          this.error(err);
        });
    },
    // 存为草稿
    saveDraft() {
      if (this.throttle) {
        return;
      }
      this.throttle = true;
      if (!this.desc) {
        Toast("描述不能为空");
        return false;
      } else if (this.imgList.length == 0) {
        Toast("图片不能为空");
      }
      let params = {
        content: this.desc,
        imgList: this.imgList,
        videoUri: this.videoUri,
        status: 1
      };
      let id = localStorage.getItem("goodsId") || "";
      saveDraft(params, id)
        .then(response => {
          if (response.code == 200) {
            this.throttle = false;
            Toast("存草稿成功");
            this.$router.push("/newStoreManage/drafts");
          }
        })
        .catch(function(error) {
          this.throttle = false;
          Toast("存草稿失败");
          this.error(error);
        });
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less">
.firstStep {
  height: 100%;
}
.weui-textarea-counter {
  height: 10px;
}

.upload {
  background-color: #f4f4f4;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
}

/*上传样式*/
.el-col {
  width: auto;
}
.el-upload--picture-card {
  width: 130px;
  height: 130px;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 130px;
  height: 130px;
  margin-right: 9px;
  margin-bottom: 9px;
}
.el-upload-list--picture-card .el-upload-list__item:nth-child(5) {
  margin-right: 0;
}
.upload .icon-untitled44,
.upload .icon-shipin {
  margin-top: 22px;
  font-size: 0.7rem;
  margin: 0;
  color: #d2d2d2;
}

.upload .editMain .el-upload--picture-card {
  background-color: #fff !important;
  border: 2px solid #d2d2d2 !important;
  line-height: 0.6rem;
  padding-top: 22px;
}
.upload .editMain .el-upload--picture-card > div {
  font-size: 20px;
  color: #d2d2d2;
}
.el-upload .el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-upload-dragger {
  width: 1.973333rem;
  height: 1.973333rem;
}
.user-button {
  border: none;
  background-color: #fff;
  line-height: 80px;
  font-size: 24px;
}

.topBanner {
  width: 100%;
  background-color: #fff;
  display: table;
}
.topBanner .btn {
  float: right;
  color: #9e2026;
  line-height: 50px;
  font-size: 32px;
  cursor: pointer;
  text-align: right;
  padding: 13px 35px;
  text-shadow: 0 0 0 #fff;
}
.topBanner .draft,
.topBanner .back {
  float: left;
  color: #999;
  text-align: left;
}
.editMain {
  width: 100%;
  margin: 11px 0 0 0;
  display: table;
  background-color: #fff;
  padding: 0px 30px 30px 30px;
  box-sizing: border-box;
}
/*.editMain .desc {
	    margin: 0 10px;
	    position: relative;
	}*/
.editMain .desc textarea {
  border: none;
  outline: none;
  width: 100%;
  /*padding: 10px;*/
  height: 233px;
  /*margin-top: 22px;*/
  border-bottom: 1px solid #eee; /*no*/
  font-size: 28px;
  border-radius: 4px;
  color: #333;
  font-family: PingFang-SC-Medium;
  resize: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
textarea::-webkit-input-placeholder {
  color: #999;
}
.mediaList {
  position: relative;
  padding: 15px;
}
.uploader--3pwSF {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.uploadButton--2B_RJ {
  margin-right: 0.1rem;
  /*margin-bottom: .12rem;*/
  height: 130px;
  width: 130px;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #888;
  background: #eee;
  border-radius: 2px;
}
.uploadButton--2B_RJ .icon--3fJFD {
  color: #888;
  font-size: 0.56rem;
}
.uploadButton--2B_RJ.disabled--gFVy- {
  background: #eeeeee;
}
.agreeBanner {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  text-align: right;
  color: #888;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-right: 30px solid transparent;
  margin-top: 20px;
}
.agreeBanner div {
  color: #f15511;
  display: inline-block;
}
</style>