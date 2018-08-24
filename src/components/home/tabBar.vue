<template>
  <div class="navigation">
      <div v-for="(list,index) in timeLists" v-bind:key="list.key" :class="{ selected:changeRed == index}" @click="Red(index)" class="navigationbar" v-bind:href="list.link">
        <p>{{list.text}}</p>
      </div>
      <div class="navupload" @click="upload">
        <!-- <uploadImg data-id=1 indexs=1 count=9 @upload="upload" isPath="tabBar"></uploadImg> -->
        <div class="iconfont icon-xiangji"></div>
       <!--  <div class="issue">发布</div> -->
      </div>
    </div>
</template>

<script>
// import wx from 'weixin-js-sdk';
import {getSign} from '../../api/api';
import {mapState} from 'vuex';
// import uploadImg from './uploadImg';
  export default {
    name : 'tabBar',
    props : ['changeRed'],
    data() {
      return {
        timeLists: [
        {
          text: "优选",
          link: "/recommend"
        },
        {
          text: "淘淘",
          link: "/home"
        },
        {
          text: "关注",
          link: "/focus"
        }
      ],
      config : {}
      }
    },
      computed: {
          ...mapState({
              WxSign: state => state.WxSign,
          })
      },
      components : {
        // uploadImg
      },
    methods : {
      //数据保存至session
      upload(data){
        this.$router.push('/upload');
        // if (data === '') {
        //   return ;
        // };
        // sessionStorage.setItem('uploadImg',JSON.stringify(data));
      },
       // tab点击跳转Start
    Red(index) {
      this.link = this.timeLists[index].link;
      this.$router.push({
        path: this.link
      });
    },
    },
    created() {
        
    },
  }
</script>

<style lang="less">
  .navigation .uploaded {
    width : 100%!important;
    height : 100%!important;
    position: absolute;
    top : 12px;
    opacity : 0;

     .img-li {
      width : 100%;
      height : 100%;
      display : none;

        label {
          width : 0.666rem!important;
          height : 0.744rem!important;
      }
      .addImg {
          display : none;
      }
    }
    #imgli{
      display : block;
    }

  }
</style>

<style scoped lang="less">
.navigation {
  position: fixed;
  top : 0;
  max-width : 10rem;
  width: 100%;
  background-color: #fff;
  z-index : 5;
  box-sizing :border-box;
}
.navigationbar {
  float: left;
  width: 94px;
  height: 79px;
  color: #999;
  font-size: 32px;
  line-height: 74px;
  text-align: center;
  margin-left: 0.733333rem;
  border-bottom:4px solid transparent;
  box-sizing : border-box;
}
.navigationbar p {
  height : 100%;
  box-sizing : border-box;
  line-height : 1.15rem;
}
.navigationbar.selected {
  color: #9e2026;
  border-bottom: 4.5px solid #9e2026;
  font-weight : 700;
}
.navigation .navupload {
  float: right;
  margin-right: 30px;
}
.navigation .icon-xiangji {
  margin: 0;
  width: 50px;
  margin-top: 10px;
  color: #9E2026;
  text-align: center;
  font-size:56px;
}
.navigation .issue {
  width: 50px;
  color: #999;
  text-align: center;
}
</style>

