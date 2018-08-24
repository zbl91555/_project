<template>
  <div class="message">
    <div class="head">
      <router-link to="/message/dealAndInform">
        <div class="fleft">
          <div class="iconfont icon-wuliu2">
            <div class="numbers">1</div>
          </div>
          <div class="mleft">交易物流</div>
        </div>
      </router-link>
      <router-link to="/message/dealAndInform">
        <div class="fleft">
          <div class="icon-notice iconfont"></div>
          <div>通知</div>
        </div>
      </router-link>
    </div>
    <div class="gray height">
    </div>
    <div class="somelist">
      <div class="bordercol">
        <div class="img floatleft"></div>
        <div class="floatleft">
          <div>
            <span>淘拍堂消息</span>
            <span class="official">官方</span>
          </div>
          <div class="fontcolor marginTop">推荐有礼震撼上线</div>
        </div>
        <div class="floatright fontcolor paddingright">昨天</div>
      </div>
      <div class="bordercol">
        <div class="img floatleft"></div>
        <div class="floatleft">
          <div>
            <span>淘拍堂消息</span>
            <span class="official">官方</span>
          </div>
          <div class="fontcolor marginTop">推荐有礼震撼上线</div>
        </div>
        <div class="floatright fontcolor paddingright">昨天</div>
      </div>
      <div class="bordercol">
        <div class="img floatleft"></div>
        <div class="floatleft">
          <div>
            <span>淘拍堂消息</span>
            <span class="official">官方</span>
          </div>
          <div class="fontcolor marginTop">推荐有礼震撼上线</div>
        </div>
        <div class="floatright fontcolor paddingright">昨天</div>
      </div>
      <div class="bordercol">
        <div class="img floatleft"></div>
        <div class="floatleft">
          <div>
            <span>淘拍堂消息</span>
            <span class="official">官方</span>
          </div>
          <div class="fontcolor marginTop">推荐有礼震撼上线</div>
        </div>
        <div class="floatright fontcolor paddingright">昨天</div>
      </div>
      <div class="bordercol">
        <div class="img floatleft"></div>
        <div class="floatleft">
          <div>
            <span>淘拍堂消息</span>
          </div>
          <div class="fontcolor marginTop">推荐有礼震撼上线</div>
        </div>
        <div class="floatright fontcolor paddingright">昨天</div>
      </div>
    </div>
  </div>
</template>
<script>
    import webim from 'webim'
    import {getTimLoginInfo} from '../../api/api'
    export default {
        data() {
            return {
                loginInfo:{
                    // sdkAppID:'1400069019',
                    // accountType:'24000',
                    // identifier:'14',
                    // identifierNick:'Hogus1',
                    // userSig:'eJxNjV1PgzAUQP9LXzXuUig6kz2QDRZMEQyYJcsSUtduXp2sYx3sI-53G4bR3Ldzzr33Qgqe34nlcnuoTGlOWpFHAuS2wyhVZXCFqrbQ8XoqtEZZClO6tfwX7*Vn2amuBQB-CM6wl*qosValWJnrLcYYtUlvG1XvcVtZQcFhDnUB-qTBL9WtUDs*gPv7D9cWJ*HLOA6mb00TnUyFyfn9wOliULjBvC0iP5vz3Izb48frM7unMRM0wECHk5Q9bWaLQSoz9KOblHvndCdCnmdcFGudbHZebCYP0bQdjcj3D-IuVhM_'

                },
                selType:webim.SESSION_TYPE.C2C,//当前聊天类型
                selToID:14,//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
                selSess:null,//当前聊天会话对象
                recentSessMap:null,//保存最近会话列表
                reqRecentSessCount:50,//每次请求的最近会话条数，业务可以自定义
                friendHeadUrl:'',//用于没有设置过头像的好友 默认头像
                infoMap:'',//初始化时，可以先拉取我的好友和我的群组信息
                emotionFlag:false,//是否打开过表情选择框
                curPlayAudio:null,//当前正在播放的audio对象
                getPrePageC2CHistroyMsgInfoMap:{},//保留下一次拉取好友历史消息的信息
                isLogOn:false,//是否开启sdk在控制台打印日志
                isAccessFormalEnv:true,//是否访问正式环境
                msgCache:{},//消息缓存，用于判重

            }
        },

        created(){
            this.getTimLoginInfo()
        },
        methods:{
            getTimLoginInfo() {
                getTimLoginInfo().then(response => {
                    this.loginInfo = response.data
                    this.login()
                })
            },

            login(){
                let _this = this
                let onConnNotify = function (resp) {
                    var info;
                    switch (resp.ErrorCode) {
                        case webim.CONNECTION_STATUS.ON:
                            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
                            break;
                        case webim.CONNECTION_STATUS.OFF:
                            info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
                            alert(info);
                            webim.Log.warn(info);
                            break;
                        case webim.CONNECTION_STATUS.RECONNECT:
                            info = '连接状态恢复正常: ' + resp.ErrorInfo;
                            alert(info);
                            webim.Log.warn(info);
                            break;
                        default:
                            webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
                            break;
                    }
                };
                let onMsgNotify = function onMsgNotify(newMsgList) {
                    //console.warn(newMsgList);
                    var sess, newMsg;
                    //获取所有聊天会话
                    var sessMap = webim.MsgStore.sessMap();

                    for (var j in newMsgList) {//遍历新消息
                        newMsg = newMsgList[j];
                        console.log(newMsg.getSession().id(),'seltoid')

                        if (newMsg.getSession().id() == _this.selToID) {//为当前聊天对象的消息
                            _this.selSess = newMsg.getSession();
                            //在聊天窗体中新增一条消息
                            // console.warn(newMsg);
                            console.log(newMsg)
                            //addMsg(newMsg);
                        }
                    }
                    //消息已读上报，以及设置会话自动已读标记
                    webim.setAutoRead(_this.selSess, true, true);

                    for (var i in sessMap) {
                        sess = sessMap[i];
                        if (_this.selToID != sess.id()) {//更新其他聊天对象的未读消息数
                            updateSessDiv(sess.type(), sess.id(), sess.unread());
                        }
                    }
                };

                const listeners = {
                    //监听连接状态回调变化事件,必填
                    "onConnNotify": onConnNotify,
                    //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
                    "onMsgNotify": onMsgNotify,
                };
                const options = {
                    'isAccessFormalEnv': this.isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
                    'isLogOn': this.isLogOn //是否开启控制台打印日志,默认开启，选填
                };

                webim.login(
                    this.loginInfo, listeners, options,
                    resp => {
                        console.log(resp)
                        this.getRecentContactList()
                    },
                    err => {
                        alert(err.ErrorInfo);
                    }
                );
            },
            //获取最近联系人
            getRecentContactList() {
                webim.getRecentContactList({},res =>{
                    console.log(res,'最近联系人')
                },error => {

                })
            },


        },
        mounted() {
            console.log(webim)
            //this.login()
        },
    }
</script>
<style scoped>
  .gray{
    background: #f4f4f4;
  }
  .height{
    height:40px;
  }
  .head{
    height: 222px;
    text-align: center;
  }
  .head .fleft{
    float:left;
    padding:30px 120px;
    text-align: center;
  }
  .icon-wuliu2 , .icon-notice{
    font-size: 72px;
    color: white;
  }
  .icon-wuliu2{
    background: #33b5ff;
    font-size: 72px;
    border-radius: 10px;
    width: 100px;
    height: 100px;
    position: relative;
  }
  .icon-notice{
    background: #fd8f01;
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }
  .mleft{
    margin-left: -6px;
  }
  .numbers{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background:#9e2026;
    color: white;
    position: absolute;
    top: -3px;
    right:-3px;
    font-size: 24px;
  }
  .img{
    width: 70px;
    height: 90px;
    border:1px solid #dddddd;
    border-radius: 3px;
    background-image: url('../../assets/images/maijia2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .somelist{
    overflow: hidden;
    padding-left:18px;
  }
  .somelist .floatleft{
    float: left;
    padding-left: 10px
  }
  .somelist .floatright{
    float: right;
  }
  .official{
    font-size: 24px;
    background: #dddddd;
    color: white;
    border-radius: 10px;
    height:40px;
    width: 80px;
    display: block;
    text-align: center;
    line-height: 40px;
    float: right;
  }
  .fontcolor{
    color: #a9a9a9;
    font-size: 28px;
  }
  .bordercol{
    border-bottom: 1px solid #e5e5e5;
    height: 140px;
    padding-top: 40px;
  }
  .paddingright{
    padding-right: 20px;
  }
  .marginTop{
    margin-top: 12px;
  }
</style>