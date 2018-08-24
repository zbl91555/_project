<template>

<div>
    <input id="file-selector" type="file" @change="change">
    <div class="pic">
        <img v-bind:src="ImageUrl" alt="" />
    </div>
    <button @click="delPic">删除</button>
</div>  
</template>
<script>
// 引入模块
import COS from 'cos-js-sdk-v5'
import wx from 'weixin-js-sdk'
import {getUpSign,getSign} from '../../api/api'
export default {
    data() {
            return {
               ImageUrl:'', 
               FilePostName:'',
               ETag:'',
               src:'',
                config:{}
            }
        },
    methods:{
        getSign(){
          let uri = window.location.href;
          getSign({uri}).then(response => {
              this.config = response.data
              this.config.jsApiList = ['checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'chooseImage',
                  'getLocalImgData',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'chooseWXPay',
              ];
              wx.config(this.config)
          })
        },
        changes(e){
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: res => {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    for (let i = 0;i< localIds.length;i++){
                        this.upload(localIds[i])
                    }
                }
            })
        },
        upload(localId){
            wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                    let serverId = res.serverId; // 返回图片的服务器端ID
                    alert(serverId)
                    //imgList
                    //HOST
                    //http://w.taopaitang.com/api/wximg/serverId

                }
            });
        },
        change(e){
            let _this = this;
            // var filePost = e.target.files[0]
            // var FilePostName = filePost.name.split('.')[0]
            // var uuid = function () {
            //             var S4 = function () {
            //                 return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            //             };
            //             return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            //         };
            let FilePostName = 'OiAHNzxLMS1InwcgcZcMyuCKYXcmMr7MZGHN_LEbQRsYsiZXquauvDTcOJjtYRN5';
            let uri = "http://w.taopaitang.com/api/wximg/OiAHNzxLMS1InwcgcZcMyuCKYXcmMr7MZGHN_LEbQRsYsiZXquauvDTcOJjtYRN5";
            //console.log(filePost)
      
            //bb67e498-99f2-4a36-8728-e25fe009ed8b
            //20180323bb67e498-99f2-4a36-8728-e25fe009ed8b-W750H750
            //Methods a
            var request = new XMLHttpRequest();
            getUpSign({name:FilePostName}).then(function (response) {
                    const Authorization=response.data.Authorization
                    var Host = 'http://'+response.data.bucket+'-'+response.data.appId+'.cos.'+response.data.region+'.myqcloud.com/'+FilePostName
            //
                    request.open("PUT", Host,false);
                    request.setRequestHeader('Authorization',Authorization)
                    request.send(uri)
                    if(request.readyState>3){
                        console.log(request.getResponseHeader('Etag'))
                        console.log(request)
                        _this.ImageUrl = request.responseURL;
                    }
            }).catch(function (error) {
                console.log(error);
            });


            
           
        },
        
        delPic(){
            // let _this = this;
            // var FilePostName = _this.FilePostName
            // var cos = new COS({
            //     getAuthorization: function (options, callback) {
            //         // 异步获取签名
            //         _this.$axios.get('api/getUpSign', 
            //         {params:{name:FilePostName}
            //         }).then(function(response){
            //             callback(response.data.data.Authorization)
            //         }).catch(function(error){
            //         })
            //     }
            // }); 
            // cos.deleteObject({
            //     Bucket: 'image-1256030169', // Bucket 格式：test-1250000000
            //     Region: 'ap-shanghai',
            //     Key: FilePostName,
            //     // ETag:_this.ETag
            // }, function (err, data) {
            //     console.log(err || data);
            // });
        }        
    },
    created() {
        this.getSign()
    }
}
</script>

<style scopded>
    .pic{
        width: 200px;
        height: 200px;
    }
    .pic img{
        width: 200px;
        height: 200px;
    }
</style>
