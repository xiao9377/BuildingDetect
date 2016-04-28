var path = require('path');
var fs = require('fs');

// 下载合同附件
exports.getContractAttachment = function (req, res) {

    console.log('**********getContractAttachment***********');

    //var name = req.params.name;
    //fs.exists('uploads/' + name, function(exist) {
    //    if (exist) {
    //        res.sendFile(name, { root: path.join(__dirname, '../uploadsContract') });
    //    } else {
    //        res.json({result: 'File Not Found'});
    //    }
    //});
    var filename = req.query.filename;
    var path = 'uploadsContract/' + filename;

    console.log(path);

    fs.exists(path, function(exist) {
        if (exist) {
            res.download(path, filename);
        } else {
            res.json({result: '文件不存在'});
        }
    });
};

// 下载合同输入模板文件
exports.getContractInputTemplet = function (req, res) {

    console.log('**********getContractInputTemplet***********');

    var path = 'files/contract-input-templet.xlsx';

    fs.exists(path, function(exist) {
        if (exist) {
            //res.sendFile("contract-input-templet.xlsx", { root: path.join(__dirname, '../files') });
            res.download(path, '合同录入模板.xlsx');
        } else {
            res.json({result: 'File Not Found'});
        }
    });
};

// 下载设备附件
exports.getDeviceAttachment = function (req, res) {
    console.log('**********getDeviceAttachment***********');

    var filename = req.query.filename;
    var path = 'uploadsDevice/' + filename;

    console.log(path);

    fs.exists(path, function(exist) {
        if (exist) {
            res.download(path, filename);
        } else {
            res.json({result: '文件不存在'});
        }
    });
};

// 下载员工附件
exports.getEmployeeAttachment = function (req, res) {
    console.log('**********getEmployeeAttachment***********');

    var filename = req.query.filename;
    var path = 'uploadsEmployee/' + filename;

    console.log(path);

    fs.exists(path, function(exist) {
        if (exist) {
            res.download(path, filename);
        } else {
            res.json({result: '文件不存在'});
        }
    });
};

// 下载文件附件
exports.getFileAttachment = function (req, res) {
    console.log('**********getFileAttachment***********');

    var filename = req.query.filename;
    var path = 'uploadsFile/' + filename;

    console.log(path);

    fs.exists(path, function(exist) {
        if (exist) {
            res.download(path, filename);
        } else {
            res.json({result: '文件不存在'});
        }
    });
};