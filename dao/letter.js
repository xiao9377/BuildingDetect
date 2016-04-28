var models = require('../models');
var Letter = models.Letter;

var async = require('async');

exports.count = function (callback) {
    Letter.count({}, callback);
};

exports.findById = function (id, callback) {
    Letter.findOne({_id: id}, callback);
};

exports.findByContractId = function (contractId, callback) {
    Letter.findOne({contractId: contractId}, callback);
};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;

    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Letter.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        letters: function (done) {   // 查询一页的记录
            Letter.find({}, {
                name: 1,
                projectName: 1,
                contact: 1,
                date: 1,
                content: 1,
                attachment: 1,
                remark: 1
            }).skip(start).limit(number).sort({date: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.letters;
        callback(err, result);
    });
};

exports.save = function (letter, callback) {

    var l = new Letter();

    l.name = letter.name;
    l.contractId = letter.contractId;
    l.projectName = letter.projectName;
    l.contact = letter.contact;
    l.date = letter.date;
    l.content = letter.content;
    l.attachment = letter.attachment;
    l.remark = letter.remark;
    l.secretLevel = letter.secretLevel;

    l.save(callback);
};