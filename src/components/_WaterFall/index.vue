<template>
  <div class="waterfall-container">
    <vue-waterfall-easy
      :height="waterfallHeight"
      :imgsArr="imgList"
      @scrollReachBottom="getData"
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
import { getRecommend } from '../../api/api.js'

const PAGE_NUM = 8
export default {
  data () {
    return {
      page: 1,
      waterfallHeight: 0,
      imgList: []
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      this.fetchData()
    },
    async fetchData () {
      const { data: { items } } = await getRecommend({
        page: this.page,
        pagenum: PAGE_NUM
      })
      this.page++
      const newImgList = items.map(item => ({src: item.cover, ...item}))
      this.imgList = this.imgList.concat(newImgList)
      console.log(this.imgList)
    }
  },
  created () {
    this.fetchData()
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
