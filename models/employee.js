/**
 * Created by yg on 2016/4/9.
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Employee = Schema({
    name: String,             //职员姓名
    sex: String,              //性别
    age: Number,              //年龄
    job: String,              //职务（职位）
    title: String,            //职称
    seniority: Number,        //工龄
    education: String,        //文化程度
    major: String,            //所学专业
    nowPost: String,          //现在部门岗位
    contact: String,           //联系方式
    //photo: String,               //照片路径
    attachment: String           //附件路径
});

mongoose.model('employee', Employee);