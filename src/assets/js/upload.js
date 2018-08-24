const cos = new COS({
    // 必选参数
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
});


var config = {
    SecretId: 'AKIDQeXEhtGeBTWKuGiUIsEKCpDMGwObaHiu',
    SecretKey: '3rRlslOkrhHafU4QXP2QYS8ZliQt76qM',
    Bucket: 'test-1250000000',
    Region: 'ap-shanghai'
};

module.exports = config;

function getAuth() {
    var key = '1mb.zip';
    var auth = cos.getAuth({
        Method: 'get',
        Key: key,
        Expires: 60,
    });
    console.log('http://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com' + '/' + key + '?sign=' + encodeURIComponent(auth));
}


