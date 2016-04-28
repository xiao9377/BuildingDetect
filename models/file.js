/**
 * Created by yg on 2016/4/21.
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var File = Schema({
    theme: String,           // 主题、文件名
    date: Date,             // 时间
    attachment: String         // 附件
});

mongoose.model('file', File);