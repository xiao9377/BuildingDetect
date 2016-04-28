/**
 * Created by yg on 2016/4/9.
 */
var Employee = require('../dao').Employee;
var async = require('async');
var formidable = require('formidable'),
    util = require('util');
var fs = require('fs');

exports.getEmployeeByPage = function (req, res) {
    console.log('**********getEmployeeByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);
    //console.log("page: " + page + ", number: " + number);
    Employee.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.getEmployeeByPhone = function(req, res){
    var phone = req.params.phone;

    Employee.findByPhone(phone, function(err, employee){
        if (err) {
            console.log(err.message);
            res.status(500).send({err: err.message});
        } else {
            return res.json({employee: employee});
        }
    })
};

exports.getEmployeeById = function (req, res) {
    console.log('**********findEmployeeById***********');

    var id = req.params.id;

    async.waterfall([
        function (cb) {
            Employee.findById(id, function (err, employee) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, employee);
                }
            });
        }
    ], function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

exports.postEmployee = function (req, res) {
    console.log('**********postEmployee***********');

    var data = req.body.data;

    var employee = data.employee;

    console.log(employee);

    async.parallel({
        employee: function (done) {
            Employee.save(employee, function (err, value) {
                done(err, value);
            });
        }
    }, function (err, results) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            console.log(results.employee);

            return res.send({result:'success'});
        }
    });
};

exports.deleteEmployee = function (req, res) {
    console.log('*********deleteEmployee************');

    var id = req.params.id;

    Employee.deleteEmployee(id, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.updateEmployee = function (req, res) {
    console.log('*********updateEmployee************');

    var data = req.body.data;
    var employee = data.employee;
    Employee.updateEmployee(employee, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.uploadImage = function (req, res) {
    console.log('***********uploadImage************');
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./uploadsEmployee";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            res.status(500).send({error: err});
        } else {
            //var inputFile = files.file;
            //inputFile.path = "./public/files/employee/" + inputFile.name;
            //console.log(inputFile.path);
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        }
    });
};

exports.uploadAttachment = function (req, res) {
    console.log('*********uploadAttachment************');

    var response = {
        originalname: req.files.file[0].originalname,
        filename: req.files.file[0].filename,
        path: req.files.file[0].path
    };

    console.log(response);

    res.json(response);

};