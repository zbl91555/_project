export default {
  install: function (Vue, {
    wx,
    getSign,
    wxShare
  }) {
    // 将时间戳转换成具体时间的函数：月+日+时+分+秒
    Vue.prototype.timestampToTime = function (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 '
      // var h = date.getHours() + ':';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      // var m = date.getMinutes() + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      // var s = date.getSeconds();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return M + D + h + m
    }

    // 将时间戳转换成具体时间的函数: 日
    Vue.prototype.timestampToTimeDay = function (timestamp) {
      var date = new Date(timestamp * 1000)
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      return D
    }

    // 将时间戳转换成具体时间的函数: 时
    Vue.prototype.timestampToTimeHours = function (timestamp) {
      var date = new Date(timestamp * 1000)
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      return h
    }

    // 将时间戳转换成具体时间的函数: 分
    Vue.prototype.timestampToTimeMin = function (timestamp) {
      var date = new Date(timestamp * 1000)
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return m
    }

    // 将时间戳转换成具体时间的函数: 秒
    Vue.prototype.timestampToTimeSec = function (timestamp) {
      var date = new Date(timestamp * 1000)
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return s
    }

    // 将时间戳转换成具体时间的函数：年+月+日
    Vue.prototype.timestampToTimeYMD = function (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = (date.getFullYear() + '.')
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + M + D
    }

    // 将时间戳转换成具体时间的函数：年+月+日
    Vue.prototype.timestampToTimeYMDHM = function (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = (date.getFullYear() + '年')
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      // var m = date.getMinutes() + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return Y + M + D + h + m
    }

    // 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
    Vue.prototype.Trim = function (str, is_global) {
      var result
      result = str.replace(/(^\s+)|(\s+$)/g, '')
      if (is_global.toLowerCase() == 'g') {
        result = result.replace(/\s/g, '')
      }
      return result
    }
    // 倒计时
    Vue.prototype.timetoEnd = function (endtime, endtime1) {
      endtime1 = '1111'
      let month, day, endhour, endminite, toendhour, toendminite, toendsecond
      const timer = setInterval(function () {
        const nowTime = new Date()
        const enddTime = new Date(endtime * 1000)
        const t = endtime - Math.floor(nowTime.getTime() / 1000)
        if (t > 0) {
          let hour = Math.floor((t / 3600))
          let min = Math.floor((t / 60) % 60)
          let sec = Math.floor(t % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          if (hour <= 0) {
            toendhour = '00'
            toendhourShow = false
            toendminiteShow = true
          } else {
            toendhourShow = true
            toendminiteShow = true
          };
          if (hour <= 0 && min <= 0) {
            toendhour = '00'
            toendhourShow = false
            toendminiteShow = false
          } else {
            toendhourShow = true
            toendminiteShow = true
          };
          if (min <= 0) {
            toendminite = '00'
          }
          if (t <= 300) {
            show = true
          }
          toendhour = hour
          toendminite = min
          toendsecond = sec
        } else {
          clearInterval(timer)
          toendhour = '00'
          toendminite = '00'
          toendsecond = '00'
        }
      }, 1000)
    }
    // 响应式布局
    Vue.prototype.responsive = function () {
      // 屏幕的宽度
      var screenWidth = window.innerWidth || document.documentElement.clientWidth
      if (screenWidth <= 320) {
        screenWidth = 320
      }
      if (screenWidth >= 750) {
        screenWidth = 750
      }
      var count = 10
      // 设置html的字体大小
      document.documentElement.style.fontSize = (screenWidth / count).toFixed(2) + 'px!important'
    }
    // 微信签名
    Vue.prototype.getJsSdk = function (uri, jsApiList) {
      getSign({
        uri
      }).then(response => {
        const jsApiList = [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard',
          'getLocalImgData'
        ]
        setTimeout(() => {
          wx.config({
            debug: false,
            appId: response.data.appId, // 必填，公众号的唯一标识
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
            signature: response.data.signature, // 必填，签名，
            jsApiList: jsApiList
          })
          wx.ready(res => {
            wx.checkJsApi({
              jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为fals
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                // alert(JSON.stringify(res));
              }
            })
          })
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            // alert(JSON.stringify(res) + "error")
          })
        }, 500)
      })
    }
    // 微信分享
    Vue.prototype.goShares = function ({
      title,
      desc,
      link,
      imgUrl,
      id = ''
    }) {
      // alert(title);alert(desc);alert(link);alert(imgUrl)
      wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          if (id) {
            wxShare(id).then(res => {
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
      wx.onMenuShareTimeline({ // 分享朋友圈
        title, // 分享标题
        link, // 分享链接
        imgUrl, // 分享图标 // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          if (id) {
            wxShare(id).then(res => {
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    }
    Vue.prototype.isIos = function () {
      var u = navigator.userAgent

      var app = navigator.appVersion
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
        // 这个是安卓操作系统
        return false
      }
      // 这个是ios操作系统
      if (isIOS) {
        return true
      }
    }
    Vue.prototype.isPC = function () {
      var userAgentInfo = navigator.userAgent
      var Agents = 'Windows'
      var flag = false
      if (userAgentInfo.indexOf(Agents) > 0) {
        flag = true
      }
      return flag
    }
    Vue.prototype.msgList = [{
      iconClass: 'icon-shouye2',
      iconClasses: 'icon-shouye1',
      title: '首页',
      linkTo: '/recommend',
      selected: true
    },
    {
      iconClass: 'icon-fenlei2',
      iconClasses: 'icon-fenlei1',
      title: '分类',
      linkTo: '/category',
      selected: false
    },
    {
      iconClass: 'icon-faxian2',
      iconClasses: 'icon-faxian',
      linkTo: '/find',
      title: '发现',
      selected: false
    },
    {
      iconClass: 'icon-wode',
      iconClasses: 'icon-wode1',
      title: '我的',
      linkTo: '/buyerCenter',
      selected: false
    }
    ]
  }
}
