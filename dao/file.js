/**
 * Created by yg on 2016/4/21.
 */
var models = require('../models');
var File = models.File;

var async = require('async');

exports.count = function (callback) {
    File.count({}, callback);
};

exports.findById = function (id, callback) {
    File.findOne({_id: id}, callback);
};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;

    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            File.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        files: function (done) {   // 查询一页的记录
            File.find({}, {
                theme: 1,
                date: 1,
                attachment: 1
            }).skip(start).limit(number).sort({date: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.files;
        callback(err, result);
    });
};

exports.save = function (file, callback) {

    var f = new File();

    f.theme = file.theme;
    f.date = file.date;
    f.attachment = file.attachment;

    f.save(callback);
};