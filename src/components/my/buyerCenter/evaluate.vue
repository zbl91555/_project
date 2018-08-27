<template>
	<div class="Kojiin">
		<div style="background: white">
			<div class="buyer-tool" :style="{backgroundImage: 'url(' + info.seller_avatar + ')'}">
				<router-link  to="/">{{info.seller_name}}</router-link>
			</div>
			<div class="border"></div>
			<div class="buy-info">
				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auctionImg + ')'}"></div>
				<p class="goods-intr">{{info.auctionDesc}}</p>
				<ul class="buyer-detail">
					<li>成交金额：￥{{info.price}}元</li>
					<li>成交时间：<i>{{timestampToTimeYMDHM((parseFloat(info.add_time)))}}</i></li>
				</ul>
			</div>
		</div>
    <div style="background: white">
		<div class="orderScore">
			<div>拍品评分</div>
			<div class="fiveStar">
				<div :class="itemClass" v-for="(itemClass,index) in starsClass" :key="itemClass" ref="list" class="iconfont" @click="selStars(index)"></div>
			</div>
		</div>
    </div>
		<div class="somereason">
			<div class="inreason">评价</div>
		</div>
		<div class="border"></div>
		<div class="descBox">
          <textarea maxlength="200" v-model="desc" placeholder="亲,写点什么吧"></textarea>
          <uploadImg count="3" @upload="upload" isPath="evaluate"></uploadImg>
      </div>
    <div class="login-btn">
          <button @click="orderCommentSubmit" class="icon-btn">提交</button>
          <div>您的任何评价都会被严格匿名</div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="dsctext" :position="position"></toast>
	</div>
</template>
<script>
import {getUpSign, orderComment, orderCommentSubmit} from '../../../api/api'
import uploadImg from '../../home/uploadImg'
import { Toast } from 'vux'
export default {
  components: {
    Toast,
    uploadImg
  },
  data () {
    return {
      // importFileUrl:'',
      // fileList:[],
      // dialogVisible: false,
      // dialogImageUrl:'',
      desc: '',
      info: {},
      order_id: '',
      stars: [0, 1, 2, 3, 4],
      starsnum: 0,
      starsClass: ['icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1'],
      position: '',
      showPositionValue: false,
      order_comment_img: [],
      dsctext: ''
    }
  },
  methods: {
    upload (list) {
      this.order_comment_img = list.list
    },
    // 弹框
    showPosition (position, dsctext) {
      this.position = position
      this.dsctext = dsctext
      this.showPositionValue = true
    },
    selStars (index) {
      this.starsnum = ''
      this.starsnum = index + 1
      this.starsClass = ['icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1', 'icon-xingxing1']
      for (var i = 0; i < this.starsnum; i++) {
        this.starsClass[i] = 'icon-xingxing2'
      }
    },
    //          // 图片上传相关操作end
    orderComment () {
      this.order_id = this.$route.params.order_id
      orderComment(this.order_id).then(
        res => {
          this.info = res.data
        }
      ).catch(err => {
        console.log(err.response.data.message)
      })
    },

    orderCommentSubmit () {
      let params = {
        order_comment: this.desc,
        order_score: this.starsnum,
        order_comment_img: this.order_comment_img
      }
      if (this.starsnum != 0) {
        orderCommentSubmit(this.order_id, params).then(res => {
          this.$router.push('/orderDetail/' + this.order_id)
        }).catch(err => {
          if (err.data.code == '400') {
            this.showPosition('middle', err.data.message)
          }
        })
      } else {
        this.showPosition('middle', '请评价星级')
      }
    }
  },
  mounted () {
    this.orderComment()
    this.$nextTick(_ => {
      this.$refs.list[4].click(4)
    })
  }
}
</script>

<style>
  .Kojiin .uploadOther {
    position: absolute;
    bottom : 30px;
    z-index : 10;
  }
  .Kojiin .el-upload--picture-card {
    border : 1px dashed #e5e5e5!important;/*no*/
    padding-top : 0.15rem!important;
    color : #999;
  }
  .Kojiin .addImg {
    bottom : 0.12rem!important;
    color : #999;
  }
  .Kojiin .icon-camera2 {
    font-size : 0.533333rem;
  }
</style>
<style lang="less" scoped>
  .Kojiin{
    background: #ededef;
    height:1300px;
  }
  .iconfont{
    font-size:48px;
  }
  .buyer-tool {
    margin: 20px 0px 20px 30px;
    height: 50px;
    line-height: 50px;
    width: 50px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
    position: relative;
    a {
      width:300px;
      display: inline-block;
      line-height: 50px;
      float: left;
      position: relative;
      padding-right: 40px;
      margin-left:80px;
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
      font-size: 32px;
    }
    .buyer-detail {
      width: 70%;
      position: absolute;
      bottom:27px;
      left: 220px;
    }
    .buyer-detail li {
      height: 25px;
      line-height: 25px;
      background-color: transparent;
      padding: 0;
      color: #999;
      margin-top: 5px;
    }
  }
  .border{
    border: 1px solid #e5e5e5;
    margin-left: 30px;
  }
  .somereason{
    margin-top: 20px;
    background: white;
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    padding:20px 30px;
  }
  .somereason .inreason{
    float: left;
    line-height: 60px;
    position: relative;
  }
  .somereason .inreason i{
    color: #a53c40;
    font-size: 48px;
    position: absolute;
    top: 10px;
    left: 100px
  }
  .somereason .choosereason{
    float: right;
    line-height: 60px;
  }
  .icon-jiantouxiangxia{
    font-size: 24px;
    margin: 0
  }
  .somereason .inreason span{
    margin-left: 40px;
    color: #999999
  }
  .border{
    border: 1px solid #e5e5e5
  }
  .descBox {
    position: relative;
    height: 408px;
    padding:30px;
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
      width: 92%;
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
	.el-col{
		width: auto;
	}
	.el-col:last-child{
		margin-left: 9px;
	}
	.el-upload--picture-card{
		width:60px;
		height:60px;
	}

	.el-upload-list--picture-card .el-upload-list__item{
		width:65px;
		height:65px;
		margin-right: 9px;
		margin-bottom: 9px;
	}
	.el-upload-list--picture-card .el-upload-list__item:nth-child(5){
		margin-right: 0
	}
	.upload .icon-untitled44 , .upload .icon-shipin{
		margin-top: 11px;
		font-size: 32px;
		margin: 0;
		color: #d2d2d2;
	}

	.upload .editMain .el-upload--picture-card{
		background-color: #fff !important;
		border: 1px solid #d2d2d2 !important;
		border-radius: 0.08rem;

		line-height:0.6rem;
		padding-top: 22px;
	}
	.upload .editMain .el-upload--picture-card > div{
		font-size: 10px;
		color: #d2d2d2;
		margin-top: 8px;
	}
	.el-upload .el-upload-dragger{
		width: 148px;
		height: 148px;
	}
	.el-upload-dragger{
		width: 1.973333rem;
		height: 1.973333rem;
	}
	.uploadBorder{
		margin-top: -160px;
		margin-left: 20px;
	}
	.addPic{
		position: absolute;
		top:0;
		height:50px;
		left: 20px;
		color: #d2d2d2
	}
	.addPic p{
		margin-top: 30px;
		text-align: center;
        margin-left: 10px;
	}
	.elPosition{
		position: relative;
		border: 2px solid #d2d2d2;
	}
	.addadd{
		position: absolute;
		top:-40px;
		left: 55px
	}
	.login-btn {
        padding:0 30px;
        margin-top: 80px;
    }
  .login-btn div{
    color: #acacac;
    margin-top: 10px;
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
    margin-top: 85px;
    outline: none;
    -webkit-appearance: none;
    font-size: 30px;
  }
  .orderScore{
    background: white;
    border-top: 1px solid #e5e5e5;
    padding-top: 26px;
    padding-bottom: 42px;
    margin-left: 30px;
  }
  .fiveStar{
    overflow: hidden;
  }
  .fiveStar div{
    float: left;
  }
  .icon-xingxing2{
    color:#f15511
  }
</style>
