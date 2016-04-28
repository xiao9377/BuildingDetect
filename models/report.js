var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Report = Schema({
    name: String,           // 报告名称
    contractId: String,     // 合同编号
    projectName: String,    // 工程名称
    type: String,           // 类型
    date: Date,             // 时间
    amount: String,         // 工作量
    remark: String,         // 备注
    secretLevel: String     // 密级 绝密-1 机密-2 秘密-3 内部-4 公开-5
});

mongoose.model('report', Report);