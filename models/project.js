var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Project = Schema({
    name: String,           // 工程名称
    contractIds: [String],  // 检测合同ID
    constructionUnit: String,  // 建设单位
    place: String,          // 地点
    structureType: String,  // 结构形式
    areaCount: String,       // 建筑面积
    remark: String          // 备注
});

mongoose.model('project', Project);