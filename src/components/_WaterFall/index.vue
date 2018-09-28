<template>
  <div class="waterfall-container">
    <vue-waterfall-easy
      :height="waterfallHeight"
      :imgsArr="imgList"
      @scrollReachBottom="getData"
    >
    </vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import { getRecommend } from '../../api/api.js'
export default {
  data () {
    return {
      waterfallHeight: 0,
      imgList: []
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      console.log('到底了')
    }
  },
  async created () {
    const { data: { items } } = await getRecommend()
    this.imgList = items.map(item => ({src: item.cover}))
    console.log(this.imgList)
  },
  mounted () {
    this.waterfallHeight = document.body.clientHeight - 56
  }
}
</script>

<style lang="less" scoped>
  .waterfall-container {

  }
</style>
