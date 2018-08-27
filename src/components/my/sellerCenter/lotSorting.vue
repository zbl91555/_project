<template>
    <div class="lotSorting" ref="ctn">
      <div class="menu border horizonBottom">
        <div class="menuList mode border verticalRight">
          <i class="iconfont icon-shijianzhongbiao"></i>
          <div  class="menuItem" @click="Red(index)">拍卖中</div>
        </div>
      </div>
      <div class="listContainer">
          <div class="listItem" v-for="(s,index) in store" :key="s">
            <div class="info">
              <div class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
              </div>
              <div class="mainInfo">
                <router-link :to="{name: 'auction', params: {id: s.id }}">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo">
                      <li>当前价格：￥{{s.leadingprice}}</li>
                      <li>出价次数: {{s.count}}次</li>
                    </ul>
                </router-link>
              </div>
            </div>
            <div class="tools">
               <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="s.top==false">置顶</button>
              <button else>已置顶</button>
            </div>
          </div>

      </div>
    </div>
</template>
<script>
import {getstore, ToTop} from '../../../api/api'
export default {
  data () {
    return {
      store: [],
      pagenum: 5,
      page: 0,
      auctioning: true

    }
  },
  created () {
    window.addEventListener('scroll', this.scrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    // 注册scroll事件并监听
    scrollHandler () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.ctn.clientHeight
      if (st + window.innerHeight >= ch) {
        this.getstore()
      }
    },
    // 获取列表
    getstore () {
      let _this = this
      this.page += 1
      let params = {
        page: this.page,
        pagenum: this.pagenum,
        type: 'auctioning'
      }
      getstore(params).then(function (response) {
        if (response.code == 200) {
          _this.store = _this.store.concat(response.data)
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 置顶
    ToTop: function (e, index) {
      let _this = this
      ToTop(e).then(function (response) {
        if (response.code == 200) {
          window.location.reload()
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getstore()
  }
}
</script>
<style scoped>
  .lotSorting {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
  }
  .lotSorting .menu {
    position: fixed;
    top: 0;
    width: 100%;
    height: 78px;
    line-height: 78px;
    max-width: 750px;
    background-color: #FFF;
    z-index: 999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .lotSorting .menu .menuList.mode {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    padding: 0 30px;
  }
  .lotSorting .menu .menuList {
    padding: 0 15px;
    float: left;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .border {
    position: relative;
  }

  .lotSorting .menu .menuList.mode .menuItem {
    padding: 0;
    width: 20%;
  }
  .lotSorting .menu .menuList .menuItem.selected {
    color: #9e2026;
    border-bottom: 4px solid #9e2026;
  }
  .lotSorting .menu .menuList .menuItem {
    font-size: 28px;
    cursor: pointer;
    text-align: center;
    padding: 0 16px;
  }
  .lotSorting .menu .menuList:after {
    height: 40%;
    top: 30%;
  }
  .border.verticalRight:after {
    top: 0;
    right: 0;
  }
  .border.verticalLeft:after, .border.verticalRight:after {
    width: 2px;
    height: 100%;
    -ms-transform: scaleX(0.5);
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
  }
  .border:after {
    position: absolute;
    content: '';
    background-color: #e5e5e5;
  }
  .lotSorting .menu .menuList .menuItem i {
    font-size:42px;
    color: #666;
  }
  .lotSorting .menu .menuList .traces .icon-zuji{
    font-size:50px;
    color: #666;
  }
  .border.horizonBottom:after {
    left: 0;
    bottom: 0;
  }
  .border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height: 2px;
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .lotSorting .blank {
    width: 100%;
    height:91px;
  }
  .lotSorting .listContainer {
    padding-top: 70px;
    background: #f4f4f4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x:hidden
}
.lotSorting .listContainer .listItem {
    margin-top: .2rem;
    background: #fff;
}
.lotSorting .listContainer .listItem .info {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -webkit-justify-content: start;
    -ms-flex-pack: start;
    justify-content: start;
    padding: .4rem .4rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.lotSorting .listContainer .listItem .tools {
    position: relative;
    text-align: right;
    width: 96%;
    margin-left: 4%;
    padding: 20px 4% 20px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
}
.lotSorting .listContainer .listItem .info .image {
    position: relative;
    min-width: 165px;
    width: 165px;
    height: 165px;
    margin-right: 23px;
    background-color: #303135;;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
}
.lotSorting .listContainer .listItem .info .mainInfo {
    width: 82%;
}
.lotSorting .listContainer .listItem .info .singlecheckc {
    width: 16%;
    padding-top: 50px;
    padding-left: 10px;
}
.lotSorting .listContainer .listItem .info .mainInfo .title {
    color: #333;
    height: 66px;
    line-height: 36px;
    margin-bottom: 37px;
    font-size: 28px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
 .lotSorting .listContainer .listItem .info .mainInfo .otherInfo {
    color: #999;
    height: 57px;
    line-height: 34px;
    font-size: 24px;
}
.lotSorting .listContainer .listItem .tools::before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #d9d9d9;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.lotSorting .listContainer .listItem .tools button {
    padding: 0;
    height: 48px;
    line-height: 48px;
    min-width: 110px;
    margin-left: 20px;
    border: 2px solid #f15511;
    border-radius:4px;
    font-size: 26px;
    background-color: #fff;
    color: #f15511;
}
.lotSorting  .icon-shijianzhongbiao{
  margin: 0;
  color: #333;
}
</style>
