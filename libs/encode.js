var crypto = require('crypto');
var DateUtils = require('./DateUtils');

exports.encrypt = function(string) {
    return crypto.createHash("md5").update(string).digest("base64");
};

// 重命名为: MD5编码文件名+5位随机数+文件名后缀
exports.renameContractFile = function(originalname) {
    var postfix = '';
    var names = originalname.split('.');
    if (names.length < 2) {
        return originalname;
    } else {
        postfix = names[names.length -1];
        //var now = new Date();
        //return crypto.createHash("md5").update(originalname).digest("base64") +
        //parseInt(10000 + Math.random() * 90000) + '.' +  postfix;
        return 'contract-' + DateUtils.getDateTimeString() + '.' +  postfix;
    }
};

exports.renameDeviceFile = function(originalname) {
    var postfix = '';
    var names = originalname.split('.');
    if (names.length < 2) {
        return originalname;
    } else {
        postfix = names[names.length -1];
        return 'device-' + DateUtils.getDateTimeString() + '.' +  postfix;
    }
};

exports.renameEmployeeFile = function(originalname) {
    var postfix = '';
    var names = originalname.split('.');
    if (names.length < 2) {
        return originalname;
    } else {
        postfix = names[names.length -1];
        return 'employee-' + DateUtils.getDateTimeString() + '.' +  postfix;
    }
};

exports.renameFile = function(originalname) {
    var postfix = '';
    var names = originalname.split('.');
    if (names.length < 2) {
        return originalname;
    } else {
        postfix = names[names.length -1];
        return 'file-' + DateUtils.getDateTimeString() + '.' +  postfix;
    }
};