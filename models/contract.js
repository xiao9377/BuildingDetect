var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Contract = Schema({
    id: String,             // 合同ID
    name: String,           // 合同名称
    isTemp: {type: Boolean, default: false},        // 是否是临时合同
    startDate: Date,        // 起始时间
    endDate: Date,          // 结束时间
    type: String,           // 类型
    client: String,         // 委托方
    detectItem: String,     // 检测项目
    structurePoint: String, // 结构布点
    payment: [],            // 试验费用
    total: Number,          //总费用
    //actualPay: [],          //实际收款
    payState: {type: Number, default: 0},       //收费状态 0-正常 1-异常
    state: Number,          // 合同状态
    attachment: String,     // 附件路径
    reportIds: [String],    // 检测报告ID
    letters: [String],      // 联系函ID
    remark: String,         // 备注
    secretLevel: {type: Number, default: 5}     // 密级 绝密-1 机密-2 秘密-3 内部-4 公开-5
});

mongoose.model('contract', Contract);