/**
 * Created by yg on 2016/4/9.
 */
var models = require('../models');
var Device = models.Device;

var async = require('async');
var DateUtils = require('../libs/DateUtils');

exports.count = function (callback) {
    Device.count({}, callback);
};

exports.findById = function (id, callback) {
    Device.findOne({_id: id}, callback);
};

//获得所有设备
exports.findAll = function (callback) {

    var result = {};
    async.parallel({
        count: function (done) {
            Device.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        devices: function (done) {
            Device.find({}).sort({validDate: 1}).exec(function (err, count) {
                done(err, count);
            });
        }
    }, function(err, results){
        result.count = results.count;
        result.results = results.devices;
        callback(err, result);
    });

};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;
    // 改进，分页查询的时候，顺便返回总数
    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Device.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        devices: function (done) {   // 查询一页的记录
            Device.find({}, {
                id: 1,
                detectContent: 1,
                name: 1,
                version: 1,
                range: 1,
                validDate: 1,
                attachment: 1
            }).skip(start).limit(number).sort({validDate: 1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.devices;
        callback(err, result);
    });
};

exports.save = function (device, callback) {
    var d = new Device();

    d.project = device.project;
    d.id = device.id;
    d.detectContent = device.detectContent;
    d.standard = device.standard;
    d.name = device.name;
    d.version = device.version;
    d.range = device.range;
    d.method = device.method;
    d.validDate = device.validDate;
    d.result = device.result;
    d.attachment = device.attachment;

    d.save(callback);
};

exports.deleteDevice = function (id, callback) {
    Device.remove({_id: id}, callback);
};

exports.updateDevice = function (device, callback) {
    Device.update({_id: device._id}, device, callback);
};