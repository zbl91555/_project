<template>
<!-- 上传效果 -->
  <div class = "uploadOther">
    <div v-show="loadingShow" class = "uploading">
			<div class = "uploadingIcon">
				<!-- <i class = "iconfont"></i> -->
				<img src="../../assets/images/loading.png" alt="">
			</div>
			<div class = "uploadingInfo"><span>正在上传{{loadingShowNum + '/' + loadingShowTotal}}</span></div>
		</div>	
    <!-- 上传 -->
    <div class = "uploaded clearfix">
						<div class = "el-col">
						<div class = "img">
							<ul class = "img-ul">
								<li @click.stop="preview(item.imgUrl,index)" :style="{background: 'url('+ item.imgUrl +')',backgroundSize:'100% 100%' }" v-for="(item,index) in imgList" :key = "item.id" class = "img-li">
									<div @click.stop="deleteImg(index)" class = "delete"></div>
								</li>
									<li class = "img-li" v-if="isPath=== 'uploads' ? videoUri : false">
									<div @click.stop="deleteVideo" class = "delete"></div>
									<div id="id_video_container">
                    <div class = "videoUrl" v-show="isVideo" :style="{backgroundImage :'url(' + videoImg + ')',backgroundSize : 'cover'}"></div>
                    <video width="1.7333rem" height="1.7333rem" v-show="!isVideo" webkit-playsinline  x5-video-player-type @pause.stop="pause" @ended.stop="ended"  :poster="videoImg"></video>
                    <img class="" v-if="isPlay" @click.stop="play" src="../../assets/images/start.png" alt="">
                  </div>
								</li>
								<li class = "img-li" id = "imgli" v-if="imgFlag">
								<label v-if="isBrowser && !isPC()" for="fileImg" @click.stop="uploadImgW">
								<div class = "el-upload--picture-card">
									<div class = "addIcon">
										<i class = "iconfont" :class="isPath === 'evaluate'? 'icon-camera2' : 'icon-untitled44' "></i>
									</div>
									<div class = "addImg" v-if="isPath == 'Kojiin'? false : true">添加图片</div>
                  <div class = "addImg" v-else><p>上传凭证</p><p>(最多三张)</p></div>
									<!-- <input @change="uploadImg" style="display:none" type="file" id="fileImg" name="file" multiple="multiple" accept="image/*" class="el-upload__input"> -->
								</div>
						</label>
							<label v-else id = "label" :for="isPath === 'personalCertificate'?'fileImg'+indexs:'fileImg'">
								<div class = "el-upload--picture-card">
									<div class = "addIcon">
										<i class = "iconfont" :class="isPath === 'evaluate'? 'icon-camera2' : 'icon-untitled44'"></i>
									</div> 
									<div class = "addImg" v-if="isPath === 'Kojiin'? false : true">添加图片</div>
                  <div class = "addImg" v-else><p>上传凭证</p><p>(最多三张)</p></div>
									<input @change.stop="uploadImgO" style="display:none" type="file" :id="isPath === 'personalCertificate'? 'fileImg' + indexs : 'fileImg'" name="file" multiple="multiple" accept="image/png,image/jpg,image/bmp,image/tiff,image/pcx,image/JPEG,image/APNG,image/WebP" class="el-upload__input">
								</div>
						</label>
								</li>
						<li class = "img-li" id = "videoli" v-if="isPath == 'uploads' && videoUri == ''" v-show="videoFlag">
							<label for="fileVideo">
						<div class = "el-upload--picture-card">
							<div class = "addIcon">
								<i class = "iconfont icon-shipin"></i>
							</div>
							<div class = "addImg">15秒视频</div>
							<input id="fileVideo" @change.stop="uploadVideoQn" style="opacity:0" type="file" name="file" accept="video/*" class="el-upload__input">
						</div>
						</label>
						</li>
							</ul>
						</div>
						</div>
					</div>
    <!-- PC端图片预览 -->
    <div class="pcPreview" v-if="pcPreview">
      <div class="imgLists">
        <div class="close" @click.stop="closePcPreview"></div>
        <p class="status">{{imgIndex + '/' + imgList.length}}</p>
        <div class="left" @click.stop="imgPage('prev')"><i class="iconfont icon-zuojiantou"></i></div>
        <div class="right" @click.stop="imgPage('next')"><i class="iconfont icon-zuojiantou"></i></div>
        <div class="imgMain">
          <div class="imgItem" v-for="(item,index) in imgList" :key="index" v-show="imgIndex == index+1">
            <img :src="item.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSign, getUpSign, getVodSign } from "../../api/api";
import moment from "moment"; //格式化时间
import wx from "weixin-js-sdk";
import { Toast, ImagePreview } from "vant"; //提示组件 预览组件
//七牛上传token getVodSign
import * as qiniu from "qiniu-js";
// import assign from "../../assets/js/assign"; //混入式方法

export default {
  name: "uploadImg",
  // mixins: [assign],
  components: {
    Toast,
    ImagePreview
    // "van-circle": Circle
  },
  data() {
    return {
      imgList: [],
      fileList: [],
      loadingShow: false,
      loadingShowTotal: 0,
      loadingShowNum: 0,
      flag: false,
      imgFlag: true,
      videoUri: "",
      etag: [],
      imgLists: [],
      percentage: 1,
      counts: 0,
      imgSetNum: 0,
      videoImg: "", //播放封面图片
      path: "http://cdn1.taopaitang.com/", //播放地址
      isPlay: true, //播放图片
      videoFlag: true,
      isVideo: true, //视频是否加载
      imgIndex :0, //PC预览图片的页码
      pcPreview : false,
    };
  },
  computed: {
    isBrowser() {
      //判断是微信浏览器还是其他
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    getCount() {
      return this.count;
    }
  },
  props: ["imgSet", "count", "upload", "videoSet", "isPath", "indexs"],
  watch: {
    imgList: {
      //图片添加按钮消失
      handler: function(val) {
        if (this.imgList.length === +this.getCount) {
          this.imgFlag = false;
          this.videoFlag = false;
        } else {
          this.imgFlag = true;
          this.videoFlag = true;
        }
        if (this.videoUri != "" && this.imgList.length >= 8) {
          this.imgFlag = false;
        }
      },
      deep: true
    },
    imgSet: {
      //重新上架用的
      handler: function(val) {
        if (this.imgSetNum === 0) {
          this.imgSetNum++;
          if (val && val.length > 0) {
            this.imgList = val;
            let reg = /\d{8}.*-W(\d+?)H(\d+)/;
            this.getImgInfo(val, reg);
          }
        }
      },
      deep: true
    },
    videoSet: {
      handler: function(val) {
        if (localStorage.getItem("uploadInfo")) {
          return;
        }
        if (val !== "") {
          let num = val.indexOf("http");
          this.videoUri = num > -1 ? val : this.path + val;
          this.videoImg = this.videoUri + "?vframe/jpg/offset/1";
          this.$emit("upload", { name: "video", videoUri: this.videoUri });
        }
      },
      deep: true
    }
  },
  methods: {
    //关闭PC端图片预览
    closePcPreview() {
      this.pcPreview = false;
    },
    //切换预览图片
    imgPage(info) {
      if (info == "prev") {
        if (this.imgIndex == 1) {
          this.imgIndex = this.imgList.length;
        } else {
          this.imgIndex--;
        }
      } else {
        if (this.imgIndex == this.imgList.length) {
          this.imgIndex = 1;
        } else {
          this.imgIndex++;
        }
      }
    },
    //全屏
    FullScreen(video) {
      var ele = document.documentElement;
      if (ele.requestFullscreen) {
        video.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      }
    },
    //取消全屏
    cancelFullScreen() {
      var de = document;
      if (de.exitFullscreen) {
        document.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    },
    pause(e) {
      this.isPlay = true;
    },
    ended() {
      this.isPlay = true;
      this.isVideo = true;
      this.cancelFullScreen();
    },
    //视频播放
    play() {
      this.isVideo = false;
        let video = document.querySelector("video");
        video.src = this.videoUri;
        video.play();
        this.isPlay = false;
        if (this.isPC()) {
          this.FullScreen(video);
        }
    },
    //获取保存的数据
    getDataInfo() {
      let uploadImg = localStorage.getItem("uploadInfo");
      if (!uploadImg) {
        return;
      }
      let uploadInfo = JSON.parse(uploadImg);
      this.imgList = uploadInfo.list;
      this.imgLists = uploadInfo.data;
      this.$emit("upload", uploadInfo);
      if (uploadInfo.videoUri) {
        this.videoUri = this.path + uploadInfo.videoUri;
        this.videoImg = this.videoUri + "?vframe/jpg/offset/1";
      }
      this.$emit("upload", { name: "video", videoUri: this.videoUri });
    },
    //获取tabBar的数据
    getTabBarData() {
      let sessionData = localStorage.getItem("uploadImg");
      if (!sessionData) {
        return;
      }
      let dataInfo = JSON.parse(sessionData);
      if (!dataInfo.list) {
        return;
      }
      this.imgList = dataInfo.list;
      this.imgLists = dataInfo.data;
      this.$emit("upload", { name: "img", list: dataInfo.data });
    },
    //数据返回
    getImgInfo(val, reg) {
      let imgList = [];
      for (let i = 0; i < val.length; i++) {
        var info = val[i].imgUrl;
        imgList.push(info);
        this.imgLists.push(reg.exec(info)[0]);
      }
      this.$emit("upload", {
        name: "img",
        list: this.imgList,
        data: this.imgLists
      });
    },
    //随机数
    uuid() {
      var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    // 移除图片
    deleteImg(index) {
      this.imgList.splice(index, 1);
      this.imgLists.splice(index, 1);
      this.$emit("upload", {
        name: "img",
        list: this.imgLists,
        data: this.imgLists
      });
      this.$store.commit("deleteUploadImg", { index });
      if (this.imgList.length < +this.getCount) {
        this.imgFlag = true;
      }
    },
    preview(url,index) {
      if (this.isPC()) {
        this.pcPreview = true;
        this.imgIndex = index+1;
      }else if(this.isBrowser) {
        this.previewW(url);
      }else {
        this.previewO(index);
      }
    },
    //图片预览 微信
    previewW(url) {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: this.imgList.map(item => {
          return item.imgUrl;
        }) // 需要预览的图片http链接列表
      });
    },
    //图片预览 vant
    previewO(index) {
      ImagePreview(this.imgList.map(item => item.imgUrl), index);
    },
    //移除视频
    deleteVideo(e) {
      this.videoUri = "";
      // this.$store.commit("uploadVideo", "");
      this.$emit("upload", { name: "video", list: this.videoUri });
    },
    getImgList(localIds) {
      let num = localIds.length;
      this.loadingShow = true;
      this.loadingShowTotal = num;
      let i = 0;
      if (this.imgList.length + num > +this.getCount) {
        Toast("图片的数量不能超过" + this.getCount + "张哟");
        return false;
      }
      let circle = () => {
        wx.uploadImage({
          localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: res => {
            i++;
            this.loadingShowNum = i;
            var serverId = res.serverId; // 返回图片的服务器端ID
            let img = new Image();
            // let path = localIds[i];
            // let path = "http://tptapi.taopaitang.com/wximg/" + serverId;
            // "http://tptapi.taopaitang.com/wximg/"
            // http://w.taopaitang.com/api/wximg/
            let path = location.origin + "/api/wximg/" + serverId;
            img.onload = () => {
              let filePic = {};
              //随机ID
              let id =
                moment().format("YYYYMMDD") +
                "" +
                serverId +
                "-W" +
                img.width +
                "H" +
                img.height;
              filePic.id = id;
              filePic.imgUrl = path;
              this.imgLists.push(id);
              if (
                this.isPath !== "setData" &&
                this.isPath !== "personalCertificate"
              ) {
                this.imgList.push(filePic);
              }
              if (i < num) {
                circle();
              } else {
                if (
                  this.isPath === "setData" ||
                  this.isPath === "personalCertificate"
                ) {
                  this.$emit("upload", {
                    // name: "img",
                    list: path,
                    name: id,
                    index: this.indexs
                  });
                } else if (this.isPath === "tabBar") {
                  this.$emit("upload", {
                    name: "img",
                    list: this.imgList,
                    data: this.imgLists
                  });
                  this.imgLists = [];
                  this.imgList = [];
                  this.$router.push("/upload");
                } else {
                  this.$emit("upload", {
                    name: "img",
                    list: this.imgList,
                    data: this.imgLists
                  });
                }
                this.loadingShow = false;
                this.loadingShowNum = 0;
              }
            };
            img.src = path;
          }
          // fail: err => {
          //   alert(JSON.stringify(err) + "err");
          // },
          // complete: res => {
          //   alert(JSON.stringify(res) + "complete");
          // },
          // cancel: res => {
          //   alert(JSON.stringify(res) + "cancel");
          // }
        });
      };
      circle();
    },
    getWxImg() {
      this.counts =
        this.counts - this.imgList.length > 0
          ? this.counts - this.imgList.length
          : 0;
      wx.chooseImage({
        count: this.counts,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 数组
          this.getImgList(localIds);
        }
        // fail: err => {
        //   alert(JSON.stringify(err) + "err");
        // },
        // complete: res => {
        //   alert(JSON.stringify(res) + "complete");
        // },
        // cancel: res => {
        //   alert(JSON.stringify(res) + "cancel");
        // }
      });
    },
    //微信浏览器图片
    uploadImgW(e) {
      // wx.checkJsApi({
      //   jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      //   success: function(res) {
      //     // 以键值对的形式返回，可用的api值true，不可用为false
      //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      //     alert(JSON.stringify(res));
      //   }
      // });
      this.getWxImg();
    },
    //其他浏览器上传
    uploadImgO(e) {
      if (e.target.files.length === 0) {
        return false;
      }
      let num = this.imgList.length;
      let count = e.target.files.length;
      if (count + num > +this.getCount) {
        Toast("图片的数量最多不能超过" + +this.getCount + "张哦");
        return false;
      }
      if (this.videoUri !== "" && e.target.files.length + num > 8) {
        Toast("图片和视频的数量一共只有9张呦");
        return false;
      }
      this.loadingShow = true;
      this.loadingShowTotal = e.target.files.length;
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        const filePost = e.target.files[i];

        let FilePostName = this.uuid();

        const request = new XMLHttpRequest();

        getUpSign({ name: FilePostName })
          .then(response => {
            const Authorization = response.data.Authorization;
            const Host =
              "http://" +
              response.data.bucket +
              "-" +
              response.data.appId +
              ".cos." +
              response.data.region +
              ".myqcloud.com/" +
              FilePostName;
            request.open("PUT", Host, false);
            request.setRequestHeader("Authorization", Authorization);
            request.send(filePost);
            if (request.readyState > 3) {
              this.loadingShowNum++;
              this.etag.push(request.getResponseHeader("Etag"));
              let img = new Image();
              img.onload = () => {
                if (
                  e.target.files.length + num >= +this.getCount &&
                  (this.isPath !== "setData" &&
                    this.isPath !== "personalCertificate")
                ) {
                  this.imgFlag = false;
                }
                let filePic = {};
                let id =
                  moment().format("YYYYMMDD") +
                  "" +
                  FilePostName +
                  "-W" +
                  img.width +
                  "H" +
                  img.height;
                filePic.id = id;
                filePic.imgUrl = request.responseURL;
                this.imgLists.push(id);
                //服务器返回的图片地址 集合
                if (
                  this.isPath === "setData" ||
                  this.isPath === "personalCertificate"
                ) {
                  this.$emit("upload", {
                    name: "img",
                    list: request.responseURL,
                    name: id,
                    index: this.indexs
                  });
                } else if (this.isPath === "tabBar") {
                  //本地数据存储
                  this.imgList.push(filePic);
                  this.$emit("upload", {
                    name: "img",
                    list: this.imgList,
                    data: this.imgLists
                  });
                  if (this.imgList.length === +count) {
                    this.imgList = [];
                    this.imgLists = [];
                    this.$router.push("/upload");
                  }
                } else {
                  this.imgList.push(filePic);
                  this.$emit("upload", {
                    name: "img",
                    list: this.imgList,
                    data: this.imgLists
                  });
                }
                if (this.loadingShowTotal === this.loadingShowNum) {
                  this.loadingShow = false;
                  this.loadingShowNum = 0;
                }
              };
              img.src = request.responseURL;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    uploadVideoQn(e) {
      this.isPlay = true;
      let _this = this;
      // this.isVideo = true;
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      this.loadingShow = true;
      this.loadingShowTotal = 1;
      this.loadingShowNum = 0;
      // const toast = Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   loadingType: "spinner",
      //   message: "正在上传"
      // });
      let putExtra = {
        fname: "",
        params: {}
        // mimeType: ['video/flv','video/mpg','video/mpeg','video/avi','video/wmv','video/mov','video/mkv','video/m4v','video/mp4'],
      };
      let config = {
        useCdnDomain: true
      };
      var observer = {
        next(res) {
          //上传进度
        },
        error(err) {
          //上传错误
          if (err.code == 400) {
            Toast("上传视频格式错误");
          } else {
            Toast("视频上传失败");
          }
        },
        complete(res) {
          //上传结果
          // Toast.clear();
          let path = _this.path + res.key;
          _this.videoUri = path;
          _this.videoImg = path + "?vframe/jpg/offset/1";
          _this.$emit("upload", { name: "video", videoUri: res.key });
          _this.counts--;
          _this.loadingShowNum = 1;
          _this.loadingShow = false;
          _this.loadingShowNum = 0;
          if (_this.imgList.length == 8) {
            _this.imgFlag = false;
          }
        }
      };
      //地址：http://cdn1.taopaitang.com/tpt-60e1c16e21bdfe69a031346970019b17?vframe/jpg/offset/1
      getVodSign().then(res => {
        let key = res.data.key;
        let token = res.data.token;
        let observable = qiniu.upload(file, key, token, putExtra, config);
        let subscription = observable.subscribe(observer);
      });
    }
  },
  created() {
    this.counts = this.getCount;
    //获取在tabBarsession中存储的数据
    // this.getTabBarData();
    //获取upload保存的数据
    this.getDataInfo();
  }
};
</script>

<style>
/* pc端预览样式 */
.pcPreview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1);
}
.pcPreview .imgLists {
  height: 90%;
  width: 70%;
  margin: 0 auto;
  background: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.pcPreview .imgLists .close {
  position: absolute;
  top : -19px;
  right : -19px;
  background: url("../../../static/images/delete.png") center;
  height: 38px;
  width: 38px;
  z-index : 999;
  border-radius : 50%;
}

.pcPreview .imgLists p {
  position: absolute;
  bottom : 20px;
  left : 50%;
  transform : translateX(-50%);
  font-size: 1.4em;
  color : #fff;
  z-index : 999;
}

.pcPreview .imgLists .left,.pcPreview .imgLists .right {
  position: absolute;
  width : 80px;
  height : 80px;
  border : 1px solid rgba(255,255,255,.37);
  border-radius : 50%;
  top : 50%;
  transform : translateY(-50%);
}

.pcPreview .imgLists .left {
  left : 20px;
}

.pcPreview .imgLists .right {
  right : 20px;
}

.pcPreview .imgLists i {
  color : #fff;
  font-size : 32px;
  position: absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
  margin : 0;
}

.pcPreview .imgLists .right i {
  transform : translate(-50%,-50%) rotate(180deg);
}

.pcPreview .imgLists .imgMain {
  width : 100%;
  height : 100%;
  overflow : hidden;
}

.pcPreview .imgLists .imgMain .imgItem {
  height : 100%;
}

.pcPreview .imgLists .imgMain .imgItem img {
  position: absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
  max-height : 100%;
  max-width : 100%;
}
/* 进度条样式 */
.uploadOther .van-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.uploadOther .van-circle svg {
  width: 200%;
}

.uploadOther .van-circle svg path:first-child {
  display: none;
}

.uploadOther .iconfont {
  color: #d2d2d2;
}

video {
  width: 100%;
  height: 100%;
}
#id_video_container {
  width: 100%;
  height: 100%;
  position: relative;
}
#id_video_container div:first-child {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
#id_video_container img {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#trump_main_unique_1 {
  width: 100% !important;
  height: 100% !important;
}
</style>

<style scoped>
/* 正在上传样式 */
.uploading {
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 333;
}

.uploadingIcon {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: white;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
}

.uploadingIcon img {
  width: 50%;
  height: 50%;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  animation: run 0.8s linear infinite;
  /* position: absolute; */
}

.uploadingInfo {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  font-size: 25px;
  color: white;
  text-align: center;
}

@keyframes run {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 清除浮动的代码 */
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}

/* 图片上传样式 */
.el-col {
  display: inline-block !important;
  float: left;
}

.clearfix {
  zoom: 1;
}

.img-ui li {
  float: left;
}

.img {
  display: inline-block;
  margin-bottom: 0.12rem;
}

.video {
  display: inline-block;
}

#label {
  float: left;
  width: 1.733333rem;
  height: 1.733333rem;
}

.img-ul {
  float: left;
}

.img-ul .img-li {
  width: 1.733333rem;
  height: 1.733333rem;
  float: left;
  margin-right: 0.06rem;
  margin-bottom: 0.12rem;
  box-sizing: border-box;
  border: 1px solid #d2d2d2; /*no*/
  position: relative;
}

.img-ul .img-li .delete {
  width: 30px;
  height: 30px;
  position: absolute;
  left: -15px;
  top: -15px;
  font-size: 12px;
  border-radius: 50%;
  background: url("../../../static/images/delete.png") no-repeat center/100%
    100%;
  z-index: 999;
}

.img-ul .img-li .delete i {
  font-size: 8px;
  text-align: center;
}

.img-ul lable {
  margin-left: 0.12rem;
}

.img-ul .img-li:nth-child(5n) {
  margin-right: 0;
}

.video {
  margin-bottom: 0.12rem;
}

.video-ul {
  float: left;
}

.video-ul .video-li {
  width: 1.733333rem;
  height: 1.733333rem;
  float: left;
  margin-right: 0.12rem;
  margin-bottom: 0.12rem;
  box-sizing: border-box;
}

.el-upload--picture-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#imgli .el-upload--picture-card {
  position: relative;
  background-color: #fff;
  border: 0.026667rem solid #d2d2d2;
  border-radius: 0.08rem;
  line-height: 0.6rem;
  padding-top: 0.293333rem;
}
.addImg {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #d2d2d2;
  text-align: center;
  position: absolute;
  bottom: 0;
}

.addIcon {
  text-align: center;
}

.col-video {
  display: inline-block !important;
  float: left;
}

#imgli {
  border: none;
}
#videoli {
  border: none;
}
</style>


