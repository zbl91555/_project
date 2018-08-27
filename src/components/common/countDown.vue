<template>
  <div class="countDown">
        <div class="countDownContainer">
            <div v-if="dayShow" class="red">{{toendday}}</div>
            <div v-if="dayShow">天</div>
            <div class="red">{{toendhour}}</div>
            <div>时</div>
            <div class="red">{{toendminite}}</div>
            <div>分</div>
            <div v-if="secShow" class="red">{{toendsecond}}</div>
        </div>
  </div>
</template>
<script>
export default {
  props: ['endtime', 'dayShow', 'secShow'],
  data () {
    return {
      toendday: '', // 距离结束天数
      toendhour: '', // 距离结束小时
      toendminite: '', // 距离结束分钟
      toendsecond: '', // 距离结束秒
      month: '', // 结束月
      day: '', // 结束天
      endhour: '', // 结束时
      endminite: '', // 结束分
      timer: ''
    }
  },
  watch: {
    endtime (newval, oldval) {
      this.timetoend(newval)
    }
  },
  methods: {
    timetoend (endtime) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let nowTime = new Date()
        let enddTime = new Date(endtime * 1000)
        let t = endtime - Math.floor(nowTime.getTime() / 1000) // 距离结束的时间差
        // endtime 月-日-时-分
        let month = enddTime.getMonth() + 1
        let day = enddTime.getDate()
        let endhour = enddTime.getHours()
        let endminite = enddTime.getMinutes()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        endhour = endhour < 10 ? '0' + endhour : endhour
        endminite = endminite < 10 ? '0' + endminite : endminite
        this.month = month
        this.day = day
        this.endhour = endhour
        this.endminite = endminite
        // endtime
        if (t > 0) {
          let day = Math.floor((t / 86400))
          let hour = Math.floor((t / 3600))
          let min = Math.floor((t / 60) % 60)
          let sec = Math.floor(t % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          if (day <= 0) {
            this.toendday = '0'
          }
          if (hour <= 0) {
            this.toendhour = '00'
          };
          if (hour <= 0 && min <= 0) {
            this.toendhour = '00'
          };
          if (min <= 0) {
            this.toendminite = '00'
          }
          this.toendday = day
          if (this.dayShow) {
            this.toendhour = hour - day * 24
          } else {
            this.toendhour = hour
          }
          this.toendminite = min
          this.toendsecond = sec
        } else {
          clearInterval(this.timer)
          this.toendday = '0'
          this.toendhour = '00'
          this.toendminite = '00'
          this.toendsecond = '00'
        }
      }, 1000)
    }
  },
  mounted () {
    this.timetoend(this.endtime)
  }
}
</script>

<style scoped>
  .countDown .countDownContainer{
      width: 190px;
      overflow:hidden;
   }
  .countDown .countDownContainer div{
      float: left;
   }
  .countDown .countDownContainer .red{
    color:#9e2026;
   }
</style>
