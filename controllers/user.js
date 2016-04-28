var User = require('../dao').User;
var Employee = require('../dao').Employee;

var encode = require('../libs/encode');
var async = require('async');

exports.getUserByPage = function(req, res){
    console.log('**********getUserByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);
    //console.log(page);
    //console.log(number);

    User.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.getUserById = function(req, res){
    console.log('**********getUserById***********');

    var userId = req.params.id;

    User.findById(userId, function(err, user){
        if(err){
            console.log(err.message);
            res.status(500).send({error: err.message});
        }else{
            return res.send(user);
        }
    });
};

exports.removeUser = function(req, res){

    var userId = req.params.id;

    User.removeUser(userId, function(err, result){
        if(err){
            console.log(err.message);
            res.status(500).send({error: err.message});
        }else{
            return res.send(result);
        }
    });
};

exports.updateUserAuth = function(req, res){

    var user = req.body.user;
    console.log(user);
    User.updateUserAuth(user, function(err, result){
        if(err){
            console.log(err.message);
            res.status(500).send({error: err.message});
        }else{
            return res.send(result);
        }
    });
};

exports.login = function (req, res) {
    console.log('**********login***********');

    //console.log(req.body.user);

    var data = req.body.user;
    var user = {};

    user.name = data.name;
    user.password = encode.encrypt(data.password);
    user.authority = data.authority;

    User.findOne(user.name, user.password, user.authority, function (err, user) {
        //console.log(user);
        if (err) {
            console.log(err);
            return res.json({err: err});
        }
        if(!user) {
            console.log('no user');
            return res.json({err: '用户不存在'});
        }
        req.session['user'] = user;
        return res.json(user);
    });
};

exports.logout = function (req, res) {
    console.log('**********logout***********');
    req.session['user'] = null;
    res.json(req.session['user']);
};

exports.getUser = function (req, res) {
    console.log('**********getUser***********');
    var data = {};
    data.user = req.session['user'];
    res.send(data);
};

exports.register = function(req, res){
    console.log('**********register***********');
    var data = req.body.user;
    var user = {};
    //var validCode = req.body.validCode;
    var phoneNumReg = /(^[0-9]{3,4}\-[0-9]{11}$)|(^[0-9]{11}$)|(^[0-9]{3,4}[0-9]{11}$)|(^0{0,1}13[0-9]{9}$)/;
    var passwordReg = /^\w+$/;

    user.name = data.phone;
    user.phone = data.phone;
    user.password = encode.encrypt(data.password);
    user.authority = data.authority;

    if(!phoneNumReg.test(data.phone)){
        return res.json({err: '请填写正确的手机号!'});
    }
    if(!passwordReg.test(data.password)){
        return res.json({err: '密码只能为数字、字母和下划线!'});
    }
    Employee.findByPhone(data.phone, function (err, employee) {
        if (err) {
            //console.log(err);
            return res.json({err: err});
        }
        if(!employee) {
            //console.log('no user');
            return res.json({err: '不允许非本公司员工注册!'});
        }
        if(employee){
            User.findByPhone(employee.contact, function(err, user){
                if(err){
                    return res.json({err: err});
                }
                if(user){
                    return res.json({err: '该电话号码已被注册！'});
                }
                res.json({employee: employee});
            });
        }
    });
};

exports.confirmRegister = function(req, res){
    console.log('**********confirm register***********');

    var data = req.body.user;
    var user = {};
    user.name = data.phone;
    user.phone = data.phone;
    user.password = encode.encrypt(data.password);
    user.authority = data.authority;
    console.log(user);
    User.save(user, function(err, user){
        if(err){
            console.log(err);
            return res.json({err: err});
        }else {
            res.send({user: user});
        }
    });
};

//var range=function(start,end)
//{
//    var array=[];
//    for(var i=start;i<end;++i) array.push(i);
//    return array;
//};
//var randomstr = range(0,5).map(function(x){
//    return Math.floor(Math.random()*10);
//}).join('');
//exports.getValidCode = function(req, res){
//    console.log('**********get validCode***********');
//
//    var user = req.body.user;
//    var phoneNumReg = /(^[0-9]{3,4}\-[0-9]{11}$)|(^[0-9]{11}$)|(^[0-9]{3,4}[0-9]{11}$)|(^0{0,1}13[0-9]{9}$)/;
//    console.log(user);
//
//    if(!phoneNumReg.test(user.phone)){
//        return res.json({err: '请填写正确的手机号!'});
//    }
//    app.smsSend({
//        sms_free_sign_name: '注册验证', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
//        sms_param: JSON.stringify({"code": randomstr, "product": "武汉明鉴管理系统"}),//短信变量，对应短信模板里面的变量
//        rec_num: user.phone, //接收短信的手机号
//        sms_template_code: 'SMS_8201088' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
//    }, function(){
//        res.send({resultCode: 100});
//    });
//};