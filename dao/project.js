var models = require('../models');
var Project = models.Project;

var async = require('async');

exports.count = function (callback) {
    Project.count({}, callback);
};

exports.findById = function (id, callback) {
    Project.findOne({_id: id}, callback);
};

exports.findByContractId = function (contractId, callback) {
    Project.findOne({contractIds: {$in: [contractId]}}, callback);
};

exports.pushContractId = function (id, contractId, callback) {
    Project.update({_id: id}, {"$push": {"contractIds": contractId}}, callback);
};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;

    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Project.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        projects: function (done) {   // 查询一页的记录
            Project.find({}, {
                name: 1,
                constructionUnit: 1,
                place: 1,
                structureType: 1,
                areaCount: 1,
                remark: 1
            }).skip(start).limit(number).sort({date: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.projects;
        callback(err, result);
    });
};

exports.save = function (project, callback) {

    var p = new Project();

    p.name = project.name;
    p.contractIds = project.contractIds;
    p.constructionUnit = project.constructionUnit;
    p.place = project.place;
    p.structureType = project.structureType;
    p.areaCount = project.areaCount;
    p.remark = project.remark;

    p.save(callback);
};