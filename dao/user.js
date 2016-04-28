var models = require('../models');
var User = models.User;

var async = require('async');

exports.findOne = function(name, password, authority, callback) {
    var query = {name: name, password: password, authority: authority};
    User.findOne(query, callback);
};

exports.findById= function(id, callback) {
    User.findOne({_id: id}, callback);
};

exports.findByPhone = function(phone, callback) {
    User.findOne({phone: phone}, callback);
};

exports.findByPage = function (number, page, callback) {
    var start = (page - 1) * number;

    var result = {};
    async.parallel({

        count: function (done) {  // 查询数量
            User.count({}).exec(function (err, count) {
                done(err, count);
            });
        },
        users: function (done) {   // 查询一页的记录
            User.find({}, {
                name: 1,
                phone: 1,
                authority: 1
            }).skip(start).limit(number).sort().exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        result.count = results.count;
        result.results = results.users;
        callback(err, result);
    });
};

exports.save = function(user, callback) {
    var u = new User();
    u.name = user.name;
    u.phone = user.phone;
    u.password = user.password;
    u.authority = user.authority;

    u.save(callback);

};

exports.removeUser = function(id, callback){

  User.remove({_id: id}, callback);
};

exports.updateUserAuth = function(user, callback){
    User.update({_id: user._id}, {$set: {authority: user.authority}}, callback);
};