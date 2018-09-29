<template>
  <div class="waterfall-container">
    <vue-waterfall-easy
      :maxCols = 2
      :fetchDataMethod='fetchDataMethod'
      srcKey="cover"
      :imgsArr="imgList"
      :height="waterfallHeight"
      @scrollReachBottom="loadMoreData"
    >
      <div class="content-container" slot-scope="data">
        <div class="avatar">
          <img :src="data.value.sellerAvatar" width="100%" height="100%">
        </div>
        <p class="price">￥{{ data.value.price }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
// import {getRecommend} from '../../api/api'

const PAGE_NUM = 1
export default {
  data () {
    return {
      page: 1,
      imgList: [],
      waterfallHeight: 0
    }
  },
  props: {
    fetchDataMethod: Function
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    loadMoreData () {
      this.genImgList()
    },
    async genImgList () {
      console.log(11111111111111)
      console.log(this.fetchDataMethod)
      const { data: { items } } = await this.fetchDataMethod({
        page: this.page,
        pagenum: PAGE_NUM
      })
      this.page++
      const newImgList = items.map(item => ({href: `/path`, ...item}))
      this.imgList = this.imgList.concat(newImgList)
    }
  },
  created () {
    this.genImgList()
  },
  mounted () {
    this.waterfallHeight = document.body.clientHeight - 56
  }
}
</script>

<style lang="less" scoped>
  .content-container {
    position: relative;
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
    font-size: 15px;
    color: #9e2026;
    text-align: right;
    .avatar {
      position: absolute;
      top: -30px;
      left: 20px;
      width: 60px;
      height: 60px;
      img {
        border-radius: 50%;
      }
    }
  }
</style>
