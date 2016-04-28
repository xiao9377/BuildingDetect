var models = require('../models');
var Report = models.Report;

var async = require('async');

exports.count = function (callback) {
    Report.count({}, callback);
};

exports.findById = function (id, callback) {
    Report.findOne({_id: id}, callback);
};

exports.findByContractId = function (contractId, callback) {
    Report.findOne({contractId: contractId}, callback);
};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;

    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Report.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        reports: function (done) {   // 查询一页的记录
            Report.find({}, {
                name: 1,
                projectName: 1,
                type: 1,
                date: 1,
                amount: 1,
                remark: 1
            }).skip(start).limit(number).sort({date: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.reports;
        callback(err, result);
    });
};

exports.save = function (report, callback) {

    var r = new Report();

    r.name = report.name;
    r.contractId = report.contractId;
    r.projectName = report.projectName;
    r.type = report.type;
    r.date = report.date;
    r.amount = report.amount;
    r.remark = report.remark;
    r.secretLevel = report.secretLevel;

    r.save(callback);
};