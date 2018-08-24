const ua = window.navigator.userAgent.toLowerCase();

export default {

    isWechat(){
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
    isAndroid() {
        if (/(Android)/i.test(navigator.userAgent)){
            return true;
        } else {
            return false;
        }
    },
    isIos(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            return true;
        } else {
            return false;
        }
    }

}