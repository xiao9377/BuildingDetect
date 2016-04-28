/**
 * Created by yg on 2016/4/9.
 */
var models = require('../models');
var Employee = models.Employee;

var async = require('async');
var DateUtils = require('../libs/DateUtils');

exports.count = function (callback) {
    Employee.count({}, callback);
};

exports.findById = function (id, callback) {
    Employee.findOne({_id: id}, callback);
};

exports.findByPhone = function (phone, callback) {
    Employee.findOne({contact: phone}, callback);
};

//// 按年分类
//exports.classifyByYear = function (callback) {
//    var object = {};
//    object.map = function () {
//        emit(this.startDate.getFullYear(), {count: 1})
//    };
//
//    object.reduce = function (key, values) {
//        var result = {count: 0};
//        for (var i = 0; i < values.length; i++) {
//            result.count += values[i].count;
//        }
//        return result;
//    };
//
//    object.query = {};
//
//    Contract.mapReduce(object, callback);
//};

// 分页查询
exports.findByPage = function (number, page, callback) {

    var start = (page - 1) * number;
    // 改进，分页查询的时候，顺便返回总数
    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            Employee.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        employees: function (done) {   // 查询一页的记录
            Employee.find({}).skip(start).limit(number).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.employees;
        callback(err, result);
    });
};

exports.findByName = function (name, page, number, callback) {
    var start = (page - 1) * number;

    // 改进，分页查询的时候，顺便返回总数
    var result = {};
    async.parallel({
        count: function (done) {  // 查询数量
            Employee.count({name: name}).exec(function (err, count) {
                done(err, count);
            });
        },
        employees: function (done) {   // 查询一页的记录
            Employee.find({name: name}, {
                name: 1,
                sex: 1,
                age: 1,
                job: 1,
                title: 1,
                seniority: 1
            }).skip(start).limit(number).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.employees;
        callback(err, result);
    });
};

exports.findBySex = function (sex, page, number, callback) {
    var start = (page - 1) * number;

    var result = {};
    async.parallel({
        count: function (done) {  // 查询数量
            Employee.count({sex: sex}).exec(function (err, count) {
                done(err, count);
            });
        },
        employees: function (done) {   // 查询一页的记录
            Employee.find({sex: sex}, {
                name: 1,
                sex: 1,
                age: 1,
                job: 1,
                title: 1,
                seniority: 1
            }).skip(start).limit(number).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.employees;
        callback(err, result);
    });
};

exports.findByJob = function (job, page, number, callback) {
    var start = (page - 1) * number;

    var result = {};
    async.parallel({
        count: function (done) {  // 查询数量
            Employee.count({job: job}).exec(function (err, count) {
                done(err, count);
            });
        },
        employees: function (done) {   // 查询一页的记录
            Employee.find({job: job}).skip(start).limit(number).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.employees;
        callback(err, result);
    });
};

exports.save = function (employee, callback) {
    var e = new Employee();

    e.name = employee.name;
    e.sex = employee.sex;
    e.age = employee.age;
    e.job = employee.job;
    e.title = employee.title;
    e.seniority = employee.seniority;
    e.education = employee.education;
    e.major = employee.major;
    e.nowPost = employee.nowPost;
    e.contact = employee.contact;
    e.attachment = employee.attachment;

    e.save(callback);
};

exports.deleteEmployee = function (id, callback) {
    Employee.remove({_id: id}, callback);
};

exports.updateEmployee = function(employee, callback){
    Employee.update({_id: employee._id}, employee, callback);
};