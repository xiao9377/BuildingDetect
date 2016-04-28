var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Letter = Schema({
    name: String,           // 联系函名称
    contractId: String,     // 合同编号
    projectName: String,    // 工程名称
    contact: String,        // 联系单位
    date: Date,             // 发起时间
    content: String,        // 内容
    attachment: String,     // 附件
    remark: String,         // 备注
    secretLevel: String     // 密级 绝密-1 机密-2 秘密-3 内部-4 公开-5
});

mongoose.model('letter', Letter);