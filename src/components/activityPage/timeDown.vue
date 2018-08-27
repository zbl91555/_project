<template>
<div class="endTime">
  <span>距离结束：</span>
  <span>{{toendhour}}</span>
  <span>时</span>
  <span>{{toendminite}}</span>
  <span>分</span>
  <span>{{toendsecond}}</span>
  <span>秒</span>
</div>
</template>
<script>
export default {
  props: ['endtime'],
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
          let day = Math.floor(t / 86400)
          let hour = Math.floor(t / 3600)
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
          }
          if (hour <= 0 && min <= 0) {
            this.toendhour = '00'
          }
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

<style lang='less'>
.endTime:last-child {
  display : flex;
  align-items: center;

  span:nth-child(odd) {
    color: #666;
  }
  span:nth-child(even) {
    color: #c50405;
  }
}
</style>
