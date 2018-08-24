<template>
  <div>
    <div class="hello" v-if="page">
      <div class="headers" v-if="0">
        <div class="left">
          <img src="../../assets/news.png" alt="交易物流">
          <div class="news">1</div>
          <div>交易物流</div>
        </div>
        <div class="right">
          <img src="../../assets/notify.png" alt="通知">
          <div>通知</div>
        </div>
      </div>
      <div class="content">
        <div class="content1" v-if="0">
          <div class="left"><img src="../../assets/2.png" alt="头像"></div>
          <div class="right">
            <span class="name">系统通知</span><span class="time">昨天</span>
            <p>【新增功能】产品库新增功能上线</p>
          </div>
        </div>
        <div class="content1" v-if="0">
          <div class="left"><img src="../../assets/1.png" alt="头像"></div>
          <div class="right">
            <span class="name">淘拍堂消息</span><span class="time">昨天</span>
            <p>推荐有礼震撼上线</p>
          </div>
        </div>
        <div class="content1" v-for="item in recentSessMap" @click="toletter(item.SessionId,item.SessionNick,item.SessionImage)">
          <div class="left"><img :src="item.SessionImage" alt="头像"></div>
          <div class="right">
            <span class="name">{{item.SessionNick}}</span><span class="time">
                {{item.MsgTimeStamp}}</span>
            <p>{{item.MsgShow}}</p>
          </div>
        </div>
        <!--
        <router-link :to="{name:'letter',query:{user_id:'12'}}">
          <div class="content1" @click="toletter">
            <div class="left"><img src="../../assets/3.png" alt="头像"></div>
            <div class="right">
              <span class="name">于恒堂</span><span class="time">18/03/15</span>
              <p>收到了谢谢你哦！</p>
            </div>
          </div>
        </router-link>

        <div class="content1">
          <div class="left"><img src="../../assets/4.png" alt="头像"></div>
          <div class="right">
            <span class="name">九代医养生馆</span><span class="time">18/03/13</span>
            <p>将人参切成50px拨片，放入瓷碗内</p>
          </div>
        </div>
        <div class="content1">
          <div class="left"><img src="../../assets/5.png" alt="头像"></div>
          <div class="right">
            <span class="name">郎臻珠宝</span><span class="time">18/03/13</span>
            <p>活动爆款限时抢购~抢完马上恢复原价</p>
          </div>
        </div> -->
      </div>
    </div>
    <div v-if="!page" class="letter">
      <div class="title" v-if="0">{{name}}
        <div class="icon-wendang iconfont"></div>
        <div class="icon-gengduo iconfont"></div>
      </div>
      <div :class="{content:true,margins:emotionFlag}" ref="contents">
        <div :class="{answer:!item.state,question:item.state,clear:true}" v-for="item in datalist" :key="item.index">
          <div class="time" v-if="item.time">{{item.time}}</div>
          <img :src="tagImage"  class="title" v-if="!item.state">
          <img :src="headurl"  class="title" v-if="item.state">
          <div class="div"></div>
          <p v-html="item.content"></p>
        </div>
        <!--  <div class="question clear">
           <img src="../../assets/1.png" alt="头像" class="title">
           <img src="../../assets/logo.png" alt="图片" class="image">
         </div>
         <div class="answer clear" @click="onSendMsg">
           <img src="../../assets/1.png" alt="头像" class="title">
           <img src="../../assets/5.png" alt="图片" class="image">
         </div> -->
      </div>
      <div class="footer" ref="footer">
        <input type="text" v-model="value" @focus="hideIcon=false;scroll($event)" @blur="blur" ref="inputs">
        <button v-if="!hideIcon" @click="onSendMsg">发送</button>
        <div class="icon-icon02 iconfont" v-if="hideIcon"></div>
        <div class="icon-xiaolian iconfont" @click="showEmotion($event)"></div>
        <div class="emotion" v-if="emotionFlag">
          <img :src="item[1]" v-for="item in emotions" @click="selectEmotion(item[0])">
        </div>
      </div>
    </div>
    <div class="imgBox" v-if="(recentSessMap == 0 && !selToID)">
        <img :src="img" alt="">
    </div>
  </div>
</template>

<script>
import webim from "webim";
import { getTimLoginInfo,getFriend } from "../../api/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      emotions: "",
      datalist: [],
      newsList: [],
      lasttime: "",
      name: "",
      time: "",
      headurl: "",
      tagImage: "",
      hideIcon: true,
      page: true,
      value: "",
      loginInfo: "",
      selType: webim.SESSION_TYPE.C2C, //当前聊天类型
      selToID: 14, //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
      selSess: null, //当前聊天会话对象
      recentSessMap: [], //保存最近会话列表
      reqRecentSessCount: 50, //每次请求的最近会话条数，业务可以自定义
      friendHeadUrl: "", //用于没有设置过头像的好友 默认头像
      infoMap: {}, //初始化时，可以先拉取我的好友和我的群组信息
      emotionFlag: false, //是否打开过表情选择框
      curPlayAudio: null, //当前正在播放的audio对象
      getPrePageC2CHistroyMsgInfoMap: {}, //保留下一次拉取好友历史消息的信息
      isLogOn: false, //是否开启sdk在控制台打印日志
      isAccessFormalEnv: true, //是否访问正式环境
      msgCache: {}, //消息缓存，用于判重
      img: require("../../assets/images/beat.png")
    };
  },
  beforeRouteEnter(to, from, next) {
    //console.log(to,from)
    next(vm => vm._getTimLoginInfo());
  },
  created() {
    if (this.$route.params.user_id) {
      this.page = false;
      this.selToID = this.$route.params.user_id;
      this.name = this.$route.params.user_name;
      this.getLastC2CHistoryMsgs();
      //提前获取用户信息
      getFriend(this.selToID).then(res => {
        
      }).catch(err => {
        
      })
    }
    // else{
    //     this.page=true;
    //     this.getRecentContactList();
    // }
    //this._getTimLoginInfo()
  },
  mounted() {
    this.emotions = webim.Emotions;
  },
  watch: {
    "$route.params.user_id"(obj) {
      this.$route.meta.title = "淘拍堂";
      if (obj) {
        this.page = false;
        this.selToID = this.$route.params.user_id;
        this.name = this.$route.params.user_name;
        this.datalist = [];
        this.getLastC2CHistoryMsgs();
      } else {
        this.page = true;
      }
    }
  },
  methods: {
    showEmotion(tag) {
      if (this.emotionFlag) {
        this.emotionFlag = false;
      } else {
        this.emotionFlag = true;
      }
    },
    selectEmotion(id) {
      this.value += id;
      this.$refs.inputs.focus();
    },
    blur() {
      if (!this.value) {
        this.hideIcon = true;
      }
    },
    scroll() {
      setTimeout(function() {
        document.body.scrollTop = document.body.scrollHeight;
      }, 500);
    },
    toletter(user_id, user_name, user_image) {
      this.$route.meta.title = user_name;
      this.selToID = user_id;
      this.name = user_name;
      this.tagImage = user_image;
      this.$router.push({
        name: "letter",
        params: { user_id: user_id, user_name: user_name }
      });
    },
    _getTimLoginInfo() {
      getTimLoginInfo().then(response => {console.log(response,'-----response')
        this.loginInfo = response.data;
        console.log(this.loginInfo);
        this.login();
      });
    },
    login() {
      let _this = this;
      //登录
      let onConnNotify = function(resp) {
        var info;
        switch (resp.ErrorCode) {
          case webim.CONNECTION_STATUS.ON:
            webim.Log.warn("建立连接成功: " + resp.ErrorInfo);
            break;
          case webim.CONNECTION_STATUS.OFF:
            info =
              "连接已断开，无法收到新消息，请检查下你的网络是否正常: " +
              resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
          case webim.CONNECTION_STATUS.RECONNECT:
            info = "连接状态恢复正常: " + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
          default:
            webim.Log.error("未知连接状态: =" + resp.ErrorInfo);
            break;
        }
      };
      //获取聊天信息
      let onMsgNotify = function(newMsgList) {
        //console.warn(newMsgList);
        var sess, newMsg;
        //获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();

        for (var j in newMsgList) {
          //遍历新消息
          newMsg = newMsgList[j];
          addMsg(newMsg);
          if (newMsg.getSession().id() == _this.selToID) {
            //为当前聊天对象的消息
            _this.selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            // console.warn(newMsg);

            // addMsg(newMsg);
          }
        }
      };
      //发送消息
      let addMsg = function(msg) {
        var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
        fromAccount = msg.getFromAccount();
        if (!fromAccount) {
          fromAccount = "";
        }
        fromAccountNick = msg.getFromAccountNick();
        if (!fromAccountNick) {
          fromAccountNick = fromAccount;
        }
        isSelfSend = msg.getIsSend(); //消息是否为自己发的
        // var msgbody = document.createElement("p");
        var msgPre = "";
        var time = "";
        // msghead.className = "msghead";
        // msgbody.className = "msgbody";
        //如果是发给自己的消息
        if (!isSelfSend)
          // msghead.style.color = "blue";
          //昵称  消息时间
          _this.name = fromAccountNick;
        time = webim.Tool.formatTimeStamp(msg.getTime());
        //解析消息
        //获取会话类型，目前只支持群聊
        //webim.SESSION_TYPE.GROUP-群聊，
        //webim.SESSION_TYPE.C2C-私聊，
        sessType = msg.getSession().type();
        //获取消息子类型
        //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
        //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
        subType = msg.getSubType();
        switch (subType) {
          case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
            msgPre = convertMsgtoHtml(msg);
            break;
          case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
            msgPre = "[群红包消息]" + convertMsgtoHtml(msg);
            break;
          case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            msgPre = "[群点赞消息]" + convertMsgtoHtml(msg);
            //展示点赞动画
            //showLoveMsgAnimation();
            break;
          case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            msgPre = "[群提示消息]" + convertMsgtoHtml(msg);
            break;
        }
        // msgbody.appendChild(msgPre);
        // onemsg.appendChild(msghead);
        // //消息列表
        // msgflow.appendChild(onemsg);
        let date = new Date(time);
        let lastTime = Math.round(date.getTime() / 1000);
        if (lastTime - _this.lasttimes >= 60) {
          let hours = date.getHours() - 1;
          var minus = date.getMinutes();
          minus = minus > 9 ? minus : "0" + minus;
          if (hours > 12) {
            time = "下午" + (hours - 12) + ":" + minus;
          } else {
            time = "上午" + hours + ":" + minus;
          }
        } else {
          time = "";
        }
        _this.lasttimes = lastTime;
        _this.datalist.push({ state: false, content: msgPre, time: time });
        setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight;
        }, 0);
      };
      function convertMsgtoHtml(msg) {
        var html = "",
          elems,
          elem,
          type,
          content;
        elems = msg.getElems(); //获取消息包含的元素数组
        for (var i in elems) {
          elem = elems[i];
          type = elem.getType(); //获取元素类型
          content = elem.getContent(); //获取元素对象
          switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
              html += convertTextMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.FACE:
              html += convertFaceMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
              html += convertImageMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
              html += convertSoundMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.FILE:
              html += convertFileMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
              //html += convertLocationMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
              html += convertCustomMsgToHtml(content);
              break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
              html += convertGroupTipMsgToHtml(content);
              break;
            default:
              webim.Log.error("未知消息元素类型: elemType=" + type);
              break;
          }
        }
        return html;
      }
      function convertTextMsgToHtml(content) {
        return content.getText();
      }
      function convertFaceMsgToHtml(content) {
        var index = content.getIndex();
        var data = content.getData();
        var url = null;
        var emotion = webim.Emotions[index];
        if (emotion && emotion[1]) {
          url = emotion[1];
        }
        if (url) {
          return "<img src='" + url + "'/>";
        } else {
          return data;
        }
      }
      const listeners = {
        //监听连接状态回调变化事件,必填
        onConnNotify: onConnNotify,
        //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        onMsgNotify: onMsgNotify
      };
      const options = {
        isAccessFormalEnv: this.isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
        isLogOn: this.isLogOn //是否开启控制台打印日志,默认开启，选填
      };

      webim.login(
        this.loginInfo,
        listeners,
        options,
        resp => {console.log(resp,'------resp')
          this.headurl = resp.headurl;
          //this.getRecentContactList()
          this.initApp();
        },
        err => {
          alert(err.ErrorInfo);
        }
      );
    },
    initApp() {
      let _this = this;
      //初始化好友和群信息
      initInfoMap(initInfoMapCallbackOK);
      function initInfoMap(cbOk) {
        //读取我的好友列表
        console.log(1);
        initInfoMapByMyFriends(cbOk);
      }
      //将我的好友资料（昵称和头像）保存在infoMap
      function initInfoMapByMyFriends(cbOK) {
        console.log(2);
        var options = {
          From_Account: _this.loginInfo.identifier,
          TimeStamp: 0,
          StartIndex: 0,
          GetCount: _this.totalCount,
          LastStandardSequence: 0,
          TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"]
        };

        webim.getAllFriend(
          options,
          function(resp) {
            if (resp.FriendNum > 0) {
              var friends = resp.InfoItem;
              if (!friends || friends.length == 0) {
                if (cbOK) cbOK();
                return;
              }
              var count = friends.length;

              for (var i = 0; i < count; i++) {
                var friend = friends[i];
                var friend_account = friend.Info_Account;
                var friend_name = "";
                var friend_image = "";
                for (var j in friend.SnsProfileItem) {
                  switch (friend.SnsProfileItem[j].Tag) {
                    case "Tag_Profile_IM_Nick":
                      friend_name = friend.SnsProfileItem[j].Value;
                      break;
                    case "Tag_Profile_IM_Image":
                      friend_image = friend.SnsProfileItem[j].Value;
                      break;
                  }
                }
                var key = webim.SESSION_TYPE.C2C + "_" + friend_account;
                _this.infoMap[key] = {
                  name: friend_name,
                  image: friend_image
                };
                console.log(_this.infoMap);
              }
              if (cbOK) cbOK();
            }
          },
          function(err) {
            alert(err.ErrorInfo);
          }
        );
      }

      function initInfoMapCallbackOK() {
        // initRecentContactList();
        _this.getRecentContactList();
      }
    },
    //获取最近联系人
    getRecentContactList() {
      let _this = this;
      webim.getRecentContactList(
        { Count: 10 },
        resp => {
          var tempSess; //临时会话变量
          var firstSessType; //保存第一个会话类型
          var firstSessId; //保存第一个会话id

          if (resp.SessionItem && resp.SessionItem.length > 0) {
            //如果存在最近会话记录
            for (var i in resp.SessionItem) {
              var item = resp.SessionItem[i];
              var type = item.Type; //接口返回的会话类型
              var sessType,
                typeZh,
                sessionId,
                sessionNick = "",
                sessionImage = "",
                senderId = "",
                senderNick = "";

              typeZh = "私聊";
              sessType = webim.SESSION_TYPE.C2C; //设置会话类型
              sessionId = item.To_Account; //会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

              if (sessionId == "@TIM#SYSTEM") {
                //先过滤系统消息，，
                webim.Log.warn("过滤好友系统消息,sessionId=" + sessionId);
                continue;
              }
              var key = sessType + "_" + sessionId;
              var c2cInfo = _this.infoMap[key];
              if (c2cInfo && c2cInfo.name) {
                //从infoMap获取c2c昵称
                sessionNick = c2cInfo.name; //会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
              } else {
                //没有找到或者没有设置过
                sessionNick = sessionId; //会话昵称，如果昵称为空，默认将其设成会话id
              }
              if (c2cInfo && c2cInfo.image) {
                //从infoMap获取c2c头像
                sessionImage = c2cInfo.image; //会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
              } else {
                //没有找到或者没有设置过
                sessionImage = _this.friendHeadUrl; //会话头像，如果为空，默认将其设置demo自带的头像
              }
              senderId = senderNick = ""; //私聊时，这些字段用不到，直接设置为空

              if (sessionId == "@TLS#NOT_FOUND") {
                //会话id不存在，可能是已经被删除了
                webim.Log.warn("会话id不存在,sessionId=" + sessionId);
                continue;
              }
              tempSess = _this.recentSessMap[sessType + "_" + sessionId];
              if (!tempSess) {
                //先判断是否存在（用于去重），不存在增加一个

                if (!firstSessId) {
                  firstSessType = sessType; //记录第一个会话类型
                  firstSessId = sessionId; //记录第一个会话id
                }
                var time = webim.Tool.formatTimeStamp(item.MsgTimeStamp);
                if (new Date(time).getDate() == new Date().getDate()) {
                  time = time.slice(10, 20);
                } else if (
                  new Date(time).getDate() - new Date().getDate() ==
                  1
                ) {
                  time = "昨天";
                } else {
                  time = time.slice(0, 10);
                }
                _this.recentSessMap.push({
                  SessionType: sessType, //会话类型
                  SessionId: sessionId, //会话对象id，好友id或者群id
                  SessionNick: sessionNick, //会话昵称，好友昵称或群名称
                  SessionImage: sessionImage, //会话头像，好友头像或者群头像
                  UnreadMsgCount: item.UnreadMsgCount, //未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
                  MsgSeq: item.MsgSeq, //消息seq
                  MsgRandom: item.MsgRandom, //消息随机数
                  MsgTimeStamp: time, //消息时间戳
                  MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
                  MsgShow: item.MsgShow //消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
                });
              }
            }
          }
        },
        error => {}
      );
    },
    //获取历史消息
    getLastC2CHistoryMsgs() {
      var lastMsgTime = 0; //第一次拉取好友历史消息时，必须传 0
      var msgKey = "";
      var options = {
        Peer_Account: this.selToID, //好友帐号
        MaxCnt: 10, //拉取消息条数
        LastMsgTime: lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
        MsgKey: msgKey
      };
      let _this = this;
      webim.getC2CHistoryMsgs(options, function(resp) {
        var lasttime = 0;
        var lastdata = "";
        var complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
        var retMsgCount = resp.MsgCount; //返回的消息条数，小于或等于请求的消息条数，小于的时候，说明没有历史消息可拉取了
        if (resp.MsgList.length == 0) {
          webim.Log.error("没有历史消息了:data=" + JSON.stringify(options));
          return;
        }
        for (var j in resp.MsgList) {
          //遍历新消息
          let newMsg = resp.MsgList[j];
          addMsg(newMsg);
          console.log(newMsg);
        }
        function addMsg(msg) {
          var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
          fromAccount = msg.getFromAccount();
          if (!fromAccount) {
            fromAccount = "";
          }
          fromAccountNick = msg.getFromAccountNick();
          if (!fromAccountNick) {
            fromAccountNick = fromAccount;
          }
          isSelfSend = msg.getIsSend(); //消息是否为自己发的
          // var msgbody = document.createElement("p");
          var msgPre = "";
          var time = "";
          // msghead.className = "msghead";
          // msgbody.className = "msgbody";
          //如果是发给自己的消息
          if (!isSelfSend)
            // msghead.style.color = "blue";
            //昵称  消息时间
            _this.name = fromAccountNick;
          time = webim.Tool.formatTimeStamp(msg.getTime());
          let nowTime = Math.round(new Date().getTime() / 1000);
          let oldTime = Math.round(new Date(time).getTime() / 1000);
          if (lastdata != time.slice(0, 10)) {
            lastdata = time.slice(0, 10);
          } else {
            if (oldTime - lasttime > 60) {
              lasttime = oldTime;
              time = time.slice(10, 20);
            } else {
              time = "";
            }
          }
          //解析消息
          //获取会话类型，目前只支持群聊
          //webim.SESSION_TYPE.GROUP-群聊，
          //webim.SESSION_TYPE.C2C-私聊，
          sessType = msg.getSession().type();
          //获取消息子类型
          //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
          //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
          subType = msg.getSubType();
          switch (subType) {
            case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
              msgPre = convertMsgtoHtml(msg);
              break;
            case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
              msgPre = "[群红包消息]" + convertMsgtoHtml(msg);
              break;
            case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
              //业务自己可以增加逻辑，比如展示点赞动画效果
              msgPre = "[群点赞消息]" + convertMsgtoHtml(msg);
              //展示点赞动画
              //showLoveMsgAnimation();
              break;
            case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
              msgPre = "[群提示消息]" + convertMsgtoHtml(msg);
              break;
          }
          _this.datalist.push({
            state: msg.isSend,
            content: msgPre,
            time: time
          });
          setTimeout(function() {
            document.body.scrollTop = document.body.scrollHeight;
          }, 0);
          //300ms 后,等待图片加载完，滚动条自动滚动到底部
          // setTimeout(function () {
          //     msgflow.scrollTop = msgflow.scrollHeight;
          // }, 300);
        }
        function convertMsgtoHtml(msg) {
          var html = "",
            elems,
            elem,
            type,
            content;
          elems = msg.getElems(); //获取消息包含的元素数组
          for (var i in elems) {
            elem = elems[i];
            type = elem.getType(); //获取元素类型
            content = elem.getContent(); //获取元素对象
            switch (type) {
              case webim.MSG_ELEMENT_TYPE.TEXT:
                html += convertTextMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.IMAGE:
                html += convertImageMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.SOUND:
                html += convertSoundMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
                //html += convertLocationMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.CUSTOM:
                html += convertCustomMsgToHtml(content);
                break;
              case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                html += convertGroupTipMsgToHtml(content);
                break;
              default:
                webim.Log.error("未知消息元素类型: elemType=" + type);
                break;
            }
          }
          return html;
        }
        function convertTextMsgToHtml(content) {
          return content.getText();
        }
        function convertFaceMsgToHtml(content) {
          var index = content.getIndex();
          var data = content.getData();
          var url = null;
          var emotion = webim.Emotions[index];
          if (emotion && emotion[1]) {
            url = emotion[1];
          }
          if (url) {
            return "<img src='" + url + "'/>";
          } else {
            return data;
          }
        }
      });
    },
    onSendMsg() {
      if (!this.selToID) {
        alert("你还没有选中好友或者群组，暂不能聊天");
        this.value = "";
        return;
      }
      //获取消息内容
      var msgtosend = this.value;
      var msgLen = webim.Tool.getStrBytes(msgtosend);
      if (msgtosend.length < 1) {
        alert("发送的消息不能为空!");
        this.value = "";
        return;
      }
      var maxLen, errInfo;
      if (this.selType == webim.SESSION_TYPE.C2C) {
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
      } else {
        maxLen = webim.MSG_MAX_LENGTH.GROUP;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
      }
      if (msgLen > maxLen) {
        alert(errInfo);
        return;
      }
      if (!selSess) {
        var selSess = new webim.Session(
          this.selType,
          this.selToID,
          this.selToID,
          this.friendHeadUrl,
          Math.round(new Date().getTime() / 1000)
        );
      }
      var isSend = false; //是否为自己发送
      var seq = -1; //消息序列，-1表示 SDK 自动生成，用于去重
      var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
      var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
      var subType; //消息子类型
      if (this.selType == webim.SESSION_TYPE.C2C) {
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
      } else {
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
      }
      var msg = new webim.Msg(
        selSess,
        isSend,
        seq,
        random,
        msgTime,
        this.loginInfo.identifier,
        subType,
        this.loginInfo.identifierNick
      );
      var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
      //解析文本和表情
      var expr = /\[[^[\]]{1,3}\]/gm;
      var emotions = msgtosend.match(expr);
      if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
      } else {
        for (var i = 0; i < emotions.length; i++) {
          tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
          if (tmsg) {
            text_obj = new webim.Msg.Elem.Text(tmsg);
            msg.addText(text_obj);
          }
          emotionIndex = webim.EmotionDataIndexs[emotions[i]];
          emotion = webim.Emotions[emotionIndex];
          if (emotion) {
            face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
            msg.addFace(face_obj);
          } else {
            text_obj = new webim.Msg.Elem.Text(emotions[i]);
            msg.addText(text_obj);
          }
          restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
          msgtosend = msgtosend.substring(restMsgIndex);
        }
        if (msgtosend) {
          text_obj = new webim.Msg.Elem.Text(msgtosend);
          msg.addText(text_obj);
        }
      }
      let _this = this;
      webim.sendMsg(
        msg,
        function(resp) {
          if (_this.selType == webim.SESSION_TYPE.C2C) {
            //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            let date = new Date();
            let chuo = Math.round(date.getTime() / 1000);
            var time = 0;
            if (chuo - _this.lasttime >= 60) {
              let hours = date.getHours() - 1;
              var minus = date.getMinutes();
              minus = minus > 9 ? minus : "0" + minus;
              if (hours > 12) {
                time = "下午" + (hours - 12) + ":" + minus;
              } else {
                time = "上午" + hours + ":" + minus;
              }
            }
            _this.lasttime = chuo;
            // let date = new Date().toLocaleString();
            // _this.datalist.push({state:true,content:_this.value,time:time,headurl:_this.headurl})
            addMsg(msg);
            function addMsg(msg) {
              var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
              fromAccount = msg.getFromAccount();
              if (!fromAccount) {
                fromAccount = "";
              }
              fromAccountNick = msg.getFromAccountNick();
              if (!fromAccountNick) {
                fromAccountNick = fromAccount;
              }
              isSelfSend = msg.getIsSend(); //消息是否为自己发的
              // var msgbody = document.createElement("p");
              var msgPre = "";
              var time = "";
              // msghead.className = "msghead";
              // msgbody.className = "msgbody";
              //如果是发给自己的消息
              if (!isSelfSend)
                // msghead.style.color = "blue";
                //昵称  消息时间
                _this.name = fromAccountNick;
              time = webim.Tool.formatTimeStamp(msg.getTime());
              //解析消息
              //获取会话类型，目前只支持群聊
              //webim.SESSION_TYPE.GROUP-群聊，
              //webim.SESSION_TYPE.C2C-私聊，
              sessType = msg.getSession().type();
              //获取消息子类型
              //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
              //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
              subType = msg.getSubType();
              switch (subType) {
                case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
                  msgPre = convertMsgtoHtml(msg);
                  break;
                case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
                  msgPre = "[群红包消息]" + convertMsgtoHtml(msg);
                  break;
                case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
                  //业务自己可以增加逻辑，比如展示点赞动画效果
                  msgPre = "[群点赞消息]" + convertMsgtoHtml(msg);
                  //展示点赞动画
                  //showLoveMsgAnimation();
                  break;
                case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
                  msgPre = "[群提示消息]" + convertMsgtoHtml(msg);
                  break;
              }
              // msgbody.appendChild(msgPre);
              // onemsg.appendChild(msghead);
              // //消息列表
              // msgflow.appendChild(onemsg);
              let date = new Date(time);
              let lastTime = Math.round(date.getTime() / 1000);
              if (lastTime - _this.lasttimes >= 60) {
                let hours = date.getHours() - 1;
                var minus = date.getMinutes();
                minus = minus > 9 ? minus : "0" + minus;
                if (hours > 12) {
                  time = "下午" + (hours - 12) + ":" + minus;
                } else {
                  time = "上午" + hours + ":" + minus;
                }
              } else {
                time = "";
              }
              _this.lasttimes = lastTime;
              _this.datalist.push({ state: true, content: msgPre, time: time });
              setTimeout(function() {
                document.body.scrollTop = document.body.scrollHeight;
              }, 0);
            }
            function convertMsgtoHtml(msg) {
              var html = "",
                elems,
                elem,
                type,
                content;
              elems = msg.getElems(); //获取消息包含的元素数组
              for (var i in elems) {
                elem = elems[i];
                type = elem.getType(); //获取元素类型
                content = elem.getContent(); //获取元素对象
                switch (type) {
                  case webim.MSG_ELEMENT_TYPE.TEXT:
                    html += convertTextMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.FACE:
                    html += convertFaceMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.IMAGE:
                    html += convertImageMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.SOUND:
                    html += convertSoundMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.FILE:
                    html += convertFileMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
                    //html += convertLocationMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.CUSTOM:
                    html += convertCustomMsgToHtml(content);
                    break;
                  case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                    html += convertGroupTipMsgToHtml(content);
                    break;
                  default:
                    webim.Log.error("未知消息元素类型: elemType=" + type);
                    break;
                }
              }
              return html;
            }
            function convertTextMsgToHtml(content) {
              return content.getText();
            }
            function convertFaceMsgToHtml(content) {
              var index = content.getIndex();
              var data = content.getData();
              var url = null;
              var emotion = webim.Emotions[index];
              if (emotion && emotion[1]) {
                url = emotion[1];
              }
              if (url) {
                return "<img src='" + url + "'/>";
              } else {
                return data;
              }
            }
            setTimeout(function() {
              document.body.scrollTop = document.body.scrollHeight;
            }, 0);
          }
          webim.Tool.setCookie("tmpmsg_" + _this.selToID, "", 0);
          _this.value = "";

          // turnoffFaces_box();
        },
        function(err) {
          alert(err.ErrorInfo);
          _this.value = "";
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.imgBox {
  position: fixed;
  width: 507px;
  height: 278px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
  }
}
.hello {
  background: rgb(244, 244, 244);
  .headers {
    height: 222px;
    width: 100%;
    background: #fff;
    margin-bottom: 14px;
    border-bottom: 2px solid rgb(229, 229, 229);
    padding: 40px 140px 0;
    box-sizing: border-box;
    div {
      width: 200px;
      text-align: center;
      font-size: 32px;
      img {
        width: 110px;
      }
    }
    .left {
      float: left;
      position: relative;
      .news {
        position: absolute;
        top: -2px;
        left: 127px;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        border: 2px solid #fff;
        background: rgb(158, 32, 38);
        color: #fff;
      }
    }
    .right {
      float: right;
    }
  }
  .content {
    width: 100%;
    border-top: 2px solid rgb(229, 229, 229);
    background: #fff;
    margin-bottom: 120px;
    a:visited {
      border: none;
    }
    a:hover {
      border: none;
    }
    a:active {
      border: none;
    }
    .content1:vistted {
      border-bottom: 2px solid rgb(229, 229, 229);
    }
    .content1:hover {
      border-bottom: 2px solid rgb(229, 229, 229);
    }
    .content1:active {
      border-bottom: 2px solid rgb(229, 229, 229);
    }
    .content1 {
      height: 180px;
      margin-left: 72px;
      border-bottom: 2px solid rgb(229, 229, 229);
      .time {
        float: right;
        display: inline-block;
        color: rgb(192, 192, 192);
      }
      div {
        float: left;
        font-size: 30px;
        margin-top: 45px;
        line-height: 45px;
        img {
          width: 90px;
          height: 90px;
          margin-right: 48px;
        }
        p {
          color: rgb(192, 192, 192);
          font-size: 26px;
        }
      }
      .right {
        width: 70%;
      }
    }
  }
}
.letter {
  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
  .margins {
    padding-bottom: 440px;
  }
  .title {
    height: 80px;
    background: #d2d2d2;
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    border-bottom: 2px solid rgb(229, 229, 229);
    .iconfont {
      position: absolute;
      top: -6px;
      display: none;
    }
    .time {
      font-size: 28px;
      width: 100%;
      text-align: center;
      line-height: 50px;
    }
    .iconfont:first-child {
      right: 100px;
    }
    .iconfont:last-child {
      right: 30px;
    }
  }
  .content {
    padding-bottom: 120px;
    .answer {
      font-size: 0;
      padding: 24px 30px;
      .title {
        float: left;
        width: 80px;
        margin-right: 20px;
      }
      .image {
        float: left;
        border-radius: 8px;
      }
      .time {
        font-size: 24px;
        padding: 0 10px;
        width: 250px;
        line-height: 36px;
        margin: 0 auto;
        background: rgb(210, 210, 210);
        text-align: center;
        line-height: 50px;
        margin-bottom: 20px;
      }
      .div {
        float: left;
        width: 20px;
        height: 20px;
        border-top: 2px solid rgb(210, 210, 210);
        border-left: 2px solid rgb(210, 210, 210);
        transform: rotate(-45deg);
        background: #fff;
        margin-right: -11px;
        margin-top: 30px;
      }
      p {
        font-size: 32px;
        float: left;
        border: 2px solid rgb(210, 210, 210);
        border-radius: 8px;
        padding: 20px 28px;
        color: rgb(48, 49, 53);
        background: #fff;
        margin-top: -6px;
      }
    }
    .question {
      font-size: 0;
      padding: 24px 30px;
      .title {
        float: right;
        width: 80px;
        margin-left: 20px;
      }
      .image {
        float: right;
        border-radius: 8px;
      }
      .time {
        font-size: 24px;
        padding: 0 10px;
        width: 250px;
        line-height: 36px;
        margin: 0 auto;
        background: rgb(210, 210, 210);
        text-align: center;
        line-height: 50px;
        margin-bottom: 20px;
      }
      .div {
        float: right;
        width: 20px;
        height: 20px;
        border-top: 2px solid rgb(210, 210, 210);
        border-left: 2px solid rgb(210, 210, 210);
        transform: rotate(135deg);
        background: #fff;
        margin-left: -11px;
        margin-top: 30px;
      }
      p {
        font-size: 32px;
        float: right;
        border: 2px solid rgb(210, 210, 210);
        border-radius: 8px;
        padding: 20px 28px;
        color: rgb(48, 49, 53);
        background: #fff;
        margin-top: -6px;
      }
    }
  }
  .footer {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 10rem;
    min-height: 100px;
    bottom: 0;
    margin: 0 auto;
    background: rgb(244, 244, 244);
    border-top: 2px solid rgb(210, 210, 210);
    padding-left: 30px;
    line-height: 100px;
    box-sizing: border-box;
    overflow: hidden;
    input {
      padding-left: 20px;
      width: 64%;
      height: 60px;
      outline: none;
      font-size: 32px;
    }
    button {
      float: right;
      margin-right: 18px;
      margin-top: 14px;
      width: 104px;
      line-height: 60px;
      font-size: 34px;
      background: #9e2025;
      border-radius: 8px;
      color: #fff;
      border: none;
      margin-left: -20px;
      text-align: center;
    }
    .iconfont {
      float: right;
      margin-right: 34px;
      font-size: 60px;
      margin-top: -2px;
    }
    .emotion {
      margin-top: 30px;
      img {
        margin-left: 20px;
      }
    }
  }
}
</style>
