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
								<li @click.stop="preview(item.imgUrl)" :style="{background: 'url('+ item.imgUrl +')',backgroundSize:'100% 100%' }" v-for="(item,index) in imgList" :key = "item.id" class = "img-li">
									<div @click.stop="deleteImg(index)" class = "delete"></div>
								</li>
									<li class = "img-li" v-if="videoUri">
									<div @click.stop="deleteVideo" class = "delete"></div>
									<div id="id_video_container"></div>
											<!-- 进度条 -->
											<div v-show = "percentageShow">
											<van-circle
												v-model="currentRate"
												:rate="percentage"
												:speed="100"
												:text="text"
												size="60px"
												layer-color="#13ce66"
											/>
										</div>
								</li>
								<li class = "img-li" id = "imgli" @click.stop="uploadImg" v-if="imgFlag">
									<label for="fileImg">
								<div class = "el-upload--picture-card">
									<div class = "addIcon">
										<i class = "iconfont icon-untitled44"></i>
									</div>
									<div class = "addImg">添加图片</div>
									<!-- <input @change="uploadImg" style="display:none" type="file" id="fileImg" name="file" multiple="multiple" accept="image/*" class="el-upload__input"> -->
								</div>
						</label>
								</li>
						<li class = "img-li" id = "videoli" v-if="!videoUri">
							<label for="fileVideo">
						<div class = "el-upload--picture-card">
							<div class = "addIcon">
								<i class = "iconfont icon-shipin"></i>
							</div>
							<div class = "addImg">15秒视频</div>
							<input id="fileVideo" @change.stop="uploadVideo" style="display:none" type="file" name="file" accept="video/*" class="el-upload__input">
						</div>
						</label>
						</li>
							</ul>
						</div>
						</div>
					</div>
  </div>
</template>

<script>
import { getSign,getUpSign  } from '../../api/api';
import moment from 'moment' //格式化时间
import wx from 'weixin-js-sdk';
import $ from 'jquery';
import { Circle,Toast } from 'vant';//进度条组件
import qVideo from 'qVideo';

  export default {
		name : 'uploadOther',
		components : {
			'van-circle' : Circle
		},
    data() {
      return {
        imgList : [],
        fileList:[],
        loadingShow : false,
        loadingShowTotal : 0,
        loadingShowNum : 0,
        flag : false,
        imgFlag : true,
        msg : '图片和视屏的数量总共不能超过10个哟',
        videoUri :0,
        etag : [],
				imgLists : [],
				currentRate : 0,//進度條進度
				text:'1%',
				percentage : 1,
				percentageShow : false,//進度條是否展示
				appID : '',

      }
		},
		props : ['imgSet','count','upload'],
    watch : {
      'imgList' : {
        handler: function (val) {
          if (val.length === this.count) {
            this.imgFlag = false;
          }
        },
        deep: true,
			},
			'imgSet': {
        handler:  function(val) {
          if (this.imgSet && this.imgSet.length > 0) {console.log(this.imgSet);
						this.imgList = this.imgSet;console.log(this.imgList);
						let imgLists = this.imgSet.map(item => {
							let reg = /\d{8}.*-[W]\d{3}[H]\d{3}/;
							return reg.exec(item.imgUrl);
						})
						this.imgLists = imgLists.map(item => {
							return item['0']
						});
						this.$store.commit('addUploadImg',this.imgLists);
						console.log(this.imgLists);
					}
				},
        deep: true,
			}
    },
    methods : {
		//视频初始化
		videoPlay(fileId) {
        	new qcVideo.Player("id_video_container", {
            "file_id": fileId,
            "app_id": this.appId,
            "width":640,
            "height":480
        })
			},
      //随机数
      uuid() {
        var S4 = function () {
                      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                  };
                  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
      // 移除图片
		deleteImg(index) {
      this.imgList.splice(index,1);
      this.$store.commit('deleteUploadImg',{index});
			if (this.imgList.length < +this.count) { 
				this.imgFlag = true;
			}
		},
		//图片预览
		preview(url) {
			wx.previewImage({
				current: url, // 当前显示图片的http链接
				urls : this.imgList.map(item =>  {
				let coverUrl = item.imgUrl.substring(0,item.imgUrl.length - 6);
				return coverUrl;
					}) // 需要预览的图片http链接列表
			});
		},
		//移除视频移除视频
		deleteVideo(e) {
			this.videoUri = '';
			this.$store.commit('uploadVideo','');
		},
    getImgList(localIds) {
					let num = localIds.length;
					this.loadingShow = true;
					this.loadingShowTotal = num;
					let i = 0;
					if (this.imgList.length + num > +this.count) {
						Toast('图片的数量不能超过'+this.count+'张哟');
						return false;
					}
              //随机ID
          let circle = () => {
            wx.uploadImage({
							localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
							isShowProgressTips: 0, // 默认为1，显示进度提示
							success: res => {
								i++;
								this.loadingShowNum = i;
								var serverId = res.serverId; // 返回图片的服务器端ID
								console.log(serverId,'-----serverId');
								let img = new Image();
								let path = 'http://w.taopaitang.com/api/wximg/' + serverId;
								img.onload = () => {
									let filePic={};
									let id = moment().format("YYYYMMDD")+''+serverId+'-W'+img.width+'H'+img.height;
									filePic.id = id;
									filePic.imgUrl = path;
									this.imgLists.push(id);
									this.imgList.push(filePic);
									if (i < num) {
											circle();
									}else {
											this.$emit('upload',this.imgLists);
											this.$store.commit('addUploadImg',this.imgLists);
											this.loadingShow = false;
											this.loadingShowNum = 0;
									}
								};
								img.src = path;
							}
						});
          }
            circle();
    },
    getWxImg() {
					this.count = this.count-this.imgList.length > 0?this.count-this.imgList.length:0;
          wx.chooseImage({
            count:this.count,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 数组
									this.getImgList(localIds);
          		}
          });
    },
		//获取图片
		uploadImg(e) {
			this.getWxImg();
	},
			//获取视频本地地址
		getFileURL(file) {
				var getUrl = null;
				if (window.createObjectURL != undefined) { // basic
					getUrl = window.createObjectURL(file);
				} else if (window.URL != undefined) { // mozilla(firefox)
					getUrl = window.URL.createObjectURL(file);
				} else if (window.webkitURL != undefined) { // webkit or chrome
					getUrl = window.webkitURL.createObjectURL(file);
				}
					return getUrl;
		},
		//获取视频时长
		selectFile(e){
				var url = this.getFileURL(e.target.files[0]);
				if (url) {
					// let video = document.createElement('video');
					// video.src = url;
					let maxSize = 1024 * 1024 * 20;
						if (e.target.files[0].size <= maxSize) {
							this.videoUri = '1';
							this.percentageShow = true;
							let orderNumber = setInterval(_ => {if (this.percentage <= 90) {this.percentage += 1;this.text = this.percentage + '%'}},26)
							this.uploadSDK(e,orderNumber);
						}else {
							Toast('视频超过15秒 请重新上传');
						}
				}
		},
		//视频上传
		uploadVideo(e) {
				if (this.imgList.length >= 9) {
					Toast('亲！图片和视频的数量一共只有9张呦');
					return false;
				}
				this.selectFile(e);
	},
		//视频上传SDK
		uploadSDK(e,orderNumber) {
			let videoFile = e.target.files[0];
				let filePostName = this.uuid();
				var getSignature = (callback) => {
					getUpSign({name:filePostName,bucket:'vod'}).then(res => {
						this.appId = res.data.appId;
						callback(res.data.Authorization);
					})
					};
				qcVideo.ugcUploader.start({
					videoFile: videoFile,//视频，类型为 File
					getSignature: getSignature,//前文中所述的获取上传签名的函数
					error: (result) => {//上传失败时的回调函数
							console.log('上传失败的原因：' + result.msg);
					},
					finish: (result) => {//上传成功时的回调函数
							console.log('上传结果的fileId：' + result.fileId);
							console.log('上传结果的视频名称：' + result.videoName);
							console.log('上传结果的视频地址：' + result.videoUrl);
							this.percentageShow = false;
							this.text = "1%";
							this.percentage = 1;
							this.fileID = result.fileId;
							this.videoUri = result.videoUrl;
							this.$store.commit('uploadVideo',this.videoUri);
							this.videoPlay(result.fileId);
					},
					progress: (result) => {
						console.log('上传进度：' + result.curr);
						if (result.curr >= 1) {
							this.percentage = 100;
							this.text = '100%';
							clearInterval(orderNumber);
						}
			}
		});
		},
		//视频初始化
		videoPlay(fileId) {
			var player = new TcPlayer("player-container-id", { // player-container-id 为播放器容器ID，必须与html中一致
                fileID: '7447398155574819982', // 请传入需要播放的视频filID 必须
                appID: '1256030169', // 请传入点播账号的appID 必须
                autoplay: false //是否自动播放
            });
					}
	},
	created() {

    },
  }
</script>

<style>
	/* 進度條樣式 */
.uploadOther .van-circle {
	position : absolute;
	left : 50%;
	top : 50%;
	transform : translate(-50%,-50%);
	z-index : 100;
}

.uploadOther .van-circle svg {
	width : 200%;
}

.uploadOther .van-circle svg path:first-child {
	display : none;
}

.uploadOther .iconfont {
	color : #d2d2d2;
}

video {
	width : 100%;
	height : 100%;
}
#id_video_container {
	width : 100%;
	height : 100%;
}
#trump_main_unique_1 {
	width : 100%!important;
	height : 100%!important;
}
</style>

<style scoped>
/* 正在上传样式 */
.uploading {
	width : 200px;
	height : 200px;
	background-color : rgba(0, 0, 0, 0.5);
	position: fixed;
	top : 50%;
	left : 50%;
	transform : translate(-50%,-50%);
	z-index : 111;
}

.uploadingIcon {
	width : 100px;
	height : 100px;
	text-align : center;
	line-height : 100px;
	color : white;
	position: absolute;
	left : 50%;
	top : 35%;
	transform : translate(-50%,-50%);
}

.uploadingIcon img {
	width : 50%;
	height : 50%;
  font-size: 0.8rem;
	margin-top : 0.3rem;
	animation: run 0.8s linear infinite;
	/* position: absolute; */
}

.uploadingInfo {
	width : 100%;
	height : 30%;
	position: absolute;
	bottom : 0;
	font-size : 25px;
	color : white;
	text-align : center;
}

@keyframes run 
{
	from {transform:rotate(0deg);}	
	to {transform:rotate(360deg);}
}

/* 清除浮动的代码 */
.clearfix:after{
	content:"";
	height:0;
	line-height:0;
	display:block;
	clear:both;
	visibility:hidden;
}

/* 图片上传样式 */
.el-col {
	display : inline-block!important;
	float : left;
}

.clearfix{
 	zoom:1;
}

.img-ui li {
	float : left;
}

.img {
	display:inline-block;
	margin-bottom : 0.12rem;
}

.video {
	display:inline-block;
}

#label {
	float : left;
	width: 1.733333rem;
    height: 1.733333rem;
}

.img-ul{
	float : left;
}

.img-ul .img-li {
	width: 1.733333rem;
  height: 1.733333rem;
	float : left;
	margin-right: 0.12rem;
	margin-bottom :0.12rem;
	box-sizing : border-box;
	border : 1px solid #ccc;/*no*/
	position: relative;
}

.img-ul .img-li .delete {
	width : 30px;
	height : 30px;
	position: absolute;
	left : -15px;
	top : -15px;
	font-size : 12px;
	border-radius : 50%;
	background : url('../../../static/images/delete.png') no-repeat center/100% 100%;
}

.img-ul .img-li .delete i {
	font-size : 8px;
	text-align : center;
}

.img-ul lable {
	margin-left : 0.12rem;
}

.img-ul .img-li:nth-child(5n) {
	margin-right : 0;
}

.video {
	margin-bottom : 0.12rem;
}

.video-ul{
	float: left
}

.video-ul .video-li {
	width: 1.733333rem;
  height: 1.733333rem;
	float : left;
	margin-right: 0.12rem;
	margin-bottom :0.12rem;
	box-sizing : border-box;
}

.el-upload--picture-card {
	width: 100%;
  height: 100%;
	box-sizing : border-box;
}
.el-upload--picture-card {
	position: relative;
	background-color: #fff !important;
	border: 0.026667rem solid #d2d2d2 !important;	
	border-radius: 0.08rem;
	line-height: 0.6rem;
	padding-top: 0.293333rem;
}
.addImg {
	width : 100%;
	height : 0.6rem;
	line-height : 0.6rem;
	color : #d2d2d2;
	text-align : center;
	position: absolute;
	bottom : 0;
}

.addIcon {
	text-align : center;
}

.col-video {
	display : inline-block!important;
	float : left;
}

#imgli {
	border : none;
}
#videoli {
	border : none;
}
</style>


