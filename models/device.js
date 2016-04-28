/**
 * Created by yg on 2016/4/13.
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Device = Schema({
    id: String,              //小序号
    detectContent:String,       //检测内容
    standard:String,            //依据标准
    name: String,              //设备名称
    version: String,        //设备型号
    range: String,            //测量范围
    method:String,              //溯源方式
    validDate: Date,           //有效日期
    result:String,               //确认结果
    attachment:String          //附件路径
});

mongoose.model('device', Device);