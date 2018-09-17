<template>
<div class="classification">
	<div class="searchBox">
		<router-link to="/classifySearch">
      <i class="iconfont icon-search"></i>
      <span>搜索分类和店铺</span>
    </router-link>
	</div>
	<div class="category">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li class="menu-item" v-for="(item,index) in category" :class="{active:currentIndex===index}" @click="scrollTo(index)" :key="item.id">
            <span class="text border-1px">
              {{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul style="height:700px">
        <li  v-for="item in category" class="paddingBottom food-list food-list-hook" :key="item.id">
          <p class="title">{{item.name}}</p>
          <ul >
            <li class="food-item border-1px">
              <div class="icon" v-for="food in item.childCategory" :key="food.id">
                <router-link :to="'/category/categoryDetails/'+food.id">
                  <img width="66" height="66" :src="food.image">
                  <i>{{food.name}}</i>
                 </router-link>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
// import iscroll from "../../../node_modules/iscroll/build/iscroll-probe"
import Iscroll from '../../../static/lib/iscroll'
import bscroll from 'better-scroll'
import { category } from '../../api/api'
import helper from '../../assets/js/helper'

export default {
  data () {
    return {
      category: [],
      categoryListHeights: [],
      currentY: 0,
      currentIndexes: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (process.env.NODE_ENV === 'production') {
      if (helper.isIos() && to.path !== global.location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next(vm => vm._category())
      }
    } else {
      next(vm => vm._category())
    }
  },
  computed: {
    // 点击左侧导航栏每一个类别
    currentIndex () {
      for (let i = 0; i < this.categoryListHeights.length - 1; i++) {
        let heightBottom = this.categoryListHeights[i]
        let heightTop = this.categoryListHeights[i + 1]
        // 对滑动后currentY值不足的情况进行修正
        let diff = Math.abs(this.currentY - heightTop)
        if (diff < 150) {
          this.currentY = heightTop
        }
        // 判断currentY当前所在的区间
        if (this.currentY < heightTop && this.currentY >= heightBottom) {
          return i
        }
      }
    }
  },
  methods: {
    // 获取数据成功后执行的操作
    success (response) {
      this.goShares(response.data.share)
      this.category = response.data.categoryList
      this.category.unshift(response.data.recommendList)
      this.$nextTick(() => {
        // 是在下次 DOM 更新循环结束之后执行延迟回调
        this.initScroll()
        this.calcHeight()
      })
    },
    // 滚动插件初始化
    initScroll () {
      if (this.$refs.menu.offsetHeight == 0) {
        setTimeout(_ => {
          this.initScroll()
        }, 100)
        return
      };
      // setTimeout(_ => {
      this.menuScroll = new Iscroll(this.$refs.menu, {
        click: true
      })
      this.foodsScroll = new Iscroll(this.$refs.foods, {
        probeType: 3,
        click: true
      })
      let _this = this
      this.foodsScroll.on('scroll', function () {
        _this.currentY = Math.abs(Math.round(this.y))
        // _this.currentIndex
      }, 100)
      // })
    },
    // 计算每一个foodlist元素的高度，累加并输出为一个数组
    calcHeight () {
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let height = 0
      this.categoryListHeights.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.categoryListHeights.push(height)
      }
    },
    scrollTo (index) {
      this.currentIndexes = index
      let target = this.categoryListHeights[index]
      this.foodsScroll.scrollTo(0, -target, 400)
    },
    // 获取数据
    _category () {
      // let data = sessionStorage.getItem("category");
      // if (data) {
      //   let response = JSON.parse(data);
      //   this.success(response);
      // } else {
      category()
        .then(response => {
          if (response.code == 200) {
            this.success(response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      // }
    }
  }
}
</script>
<style scoped>
.searchBox {
  width: 100%;
  height: 90px;
  background: #eee;
  position: fixed;
  top: 0;
  z-index: 99;
  max-width: 750px;
  margin: 0 auto;
}
.searchBox a {
  height: 62px;
  line-height: 66px;
  text-align: center;
  margin: 14px 20px 0 20px;
  display: block;
  background: #fff;
  border-radius: 4px;
}
.searchBox i {
  font-size: 30px;
  margin: 0;
}
.searchBox a span {
  color: #aaa;
  padding-left: 0.066667rem;
  display: inline-block;
  vertical-align: top;
  font-size: 28px;
}
.category {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 88px;
  bottom: 48px;
  width: 100%;
  overflow: hidden;
  max-width: 750px;
  margin: 4px auto;
}
.category .menu-wrapper {
  -ms-touch-action: none;
  touch-action: none;
  position: relative;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 224px;
  flex: 0 0 224px;
  width: 224px;
  background: #f8f8f8;
}
.category .menu-wrapper .menu-item {
  display: table;
  height: 94px;
  font-size: 0;
  color: #141414;
  line-height: 94px;
  width : 100%;
  text-align : center;
}
.category .menu-wrapper .menu-item:last-child > .text::after {
  border: none;
}
.category .menu-wrapper .menu-item.active {
  position: relative;
  margin-top: -1px;
  background: #fff;
  z-index: 10;
  color: #9e2026;
}
.category .menu-wrapper .menu-item.active .text::after {
  border: none;
}
.category .menu-wrapper .menu-item .text {
  /* display: table-cell; */
  vertical-align: middle;
  /* width: 124px; */
  font-size: 30px;
  /* position: relative; */
  /* display: inline-block; */
}
.category .menu-wrapper .menu-item .text .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-top: 1px;
  margin-right: 2px;
  vertical-align: top;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.category .foods-wrapper {
  -ms-touch-action: none;
  touch-action: none;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 5.25rem;
  height:100%;
  background: white;
}
.category .foods-wrapper .title {
  position: relative;
  width: 82%;
  margin: 0 7%;
  font-size: 30px;
  color: #424242;
  line-height: 90px;
  text-align: left;
  text-indent: 14px;
}
.category .foods-wrapper .title:before {
  position: absolute;
  content: "";
  left: 0;
  top: 30px;
  width: 6px;
  height: 28px;
  background-color: #9e2026;
}
.food-list:last-child {
  padding-bottom: 7.5rem;
}
.category .foods-wrapper .food-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  margin: 0 18px 18px 18px;
  position: relative;
}
.category .foods-wrapper .food-item::after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  content: " ";
}
.category .foods-wrapper .food-item:last-child {
  margin-bottom: 0;
}
.category .foods-wrapper .food-item:last-child::after {
  border: none;
}
.category .foods-wrapper .food-item .icon {
  width: 33.3%;
  text-align: center;
}
.category .foods-wrapper .food-item .icon i {
  font-size: 24px;
  margin: 12px 0 22px 0;
  display: block;
}
.paddingBottom {
  padding-bottom: 30px;
}
.icon-search {
  color: #aaa;
}
</style>
