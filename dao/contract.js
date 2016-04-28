var models = require('../models');
var Contract = models.Contract;

var async = require('async');
var DateUtils = require('../libs/DateUtils');

exports.count = function (callback) {
    Contract.count({}, callback);
};

exports.findAll = function (callback) {
    var result = {};
    async.parallel({
        count: function (done) {
            Contract.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        contracts: function (done) {
            Contract.find({}).sort().exec(function (err, count) {
                done(err, count);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.contracts;
        callback(err, result);
    });
};

exports.findById = function (id, callback) {
    Contract.findOne({_id: id}, callback);
};

exports.classifyByType = function (callback) {
    var object = {};
    object.map = function () {
        emit(this.type, {count: 1})
    };

    object.reduce = function (key, values) {
        var result = {count: 0};
        for (var i = 0; i < values.length; i++) {
            result.count += values[i].count;
        }
        return result;
    };

    object.query = {};

    Contract.mapReduce(object, callback);
};

// 按年分类
exports.classifyByYear = function (callback) {
    var object = {};
    object.map = function () {
        emit(this.startDate.getFullYear(), {count: 1})
    };

    object.reduce = function (key, values) {
        var result = {count: 0};
        for (var i = 0; i < values.length; i++) {
            result.count += values[i].count;
        }
        return result;
    };

    object.query = {};

    Contract.mapReduce(object, callback);
};


// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;

    // 改进，分页查询的时候，顺便返回总数
    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Contract.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        contracts: function (done) {   // 查询一页的记录
            Contract.find({}, {
                name: 1,
                startDate: 1,
                client: 1,
                state: 1,
                type: 1,
                payment: 1,
                payState: 1,
                total: 1
            }).skip(start).limit(number).sort({payState:-1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.contracts;
        callback(err, result);
    });
};

exports.findByState = function (state, page, number, callback) {
    var start = (page - 1) * number;

    // 改进，分页查询的时候，顺便返回总数
    var result = {};
    async.parallel({
        count: function (done) {  // 查询数量
            Contract.count({state: state}).exec(function (err, count) {
                done(err, count);
            });
        },
        contracts: function (done) {   // 查询一页的记录
            Contract.find({state: state}, {
                name: 1,
                startDate: 1,
                client: 1,
                type: 1,
                state: 1,
                payment: 1,
                total: 1
            }).skip(start).limit(number).sort({startDate: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.contracts;
        callback(err, result);
    });
};

exports.findByYear = function (year, page, number, callback) {
    var start = (page - 1) * number;

    // 得到年份区间
    var range = DateUtils.getYearRange(year);
    var from = range.from;
    var to = range.to;

    var result = {};
    async.parallel({
        count: function (done) {  // 查询数量
            Contract.count({startDate: {$gte: from, $lt: to}}).exec(function (err, count) {
                done(err, count);
            });
        },
        contracts: function (done) {   // 查询一页的记录
            Contract.find({startDate: {$gte: from, $lt: to}}, {
                name: 1,
                startDate: 1,
                client: 1,
                state: 1,
                type: 1,
                payment: 1,
                total: 1
            }).skip(start).limit(number).sort({startDate: -1}).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.contracts;
        callback(err, result);
    });
};

exports.save = function (contract, callback) {
    var c = new Contract();

    c.id = contract.id;
    c.name = contract.name;
    c.isTemp = contract.isTemp;
    c.startDate = contract.startDate;
    c.endDate = contract.endDate;
    c.type = contract.type;
    c.client = contract.client;
    c.detectItem = contract.detectItem;
    c.structurePoint = contract.structurePoint;
    c.total = contract.total;
    c.payment = contract.payment;
    c.payState = contract.payState;
    c.state = contract.state;
    c.attachment = contract.attachment;
    c.reportIds = contract.reportIds;
    c.letters = contract.letters;
    c.remark = contract.remark;
    c.secretLevel = contract.secretLevel;

    c.save(callback);
};

exports.removeContract = function (id, callback) {

    Contract.remove({_id: id}, callback);
};

exports.postPayment = function (data, callback) {
    Contract.update({_id: data._id}, {$set: {payment: data.payment, payState: data.payState}}, callback);
};

exports.updatePaystate = function(id, payState,callback){
    if(payState == '1'){
        Contract.update({_id: id}, {$set: {payState: 1}}, callback);
    }else if(payState == '0'){
        Contract.update({_id: id}, {$set: {payState: 0}}, callback);
    }
};

exports.updateState = function(data, callback){
    Contract.update({_id: data._id}, {$set: {state: data.state}}, callback);
};