/**
 * Created by yg on 2016/4/13.
 */
var Device = require('../dao').Device;
var async = require('async');

exports.getAllDevices = function(req,res){
    console.log('**********getAllDevices***********');

    Device.findAll(function(err, result){
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    })
};

exports.getDeviceByPage = function (req, res) {
    console.log('**********getDeviceByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);
    //console.log("page: " + page + ", number: " + number);
    Device.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.getDeviceById = function (req, res) {
    console.log('**********getDeviceById***********');

    var id = req.params.id;

    async.waterfall([
        function (cb) {
            Device.findById(id, function (err, device) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, device);
                }
            });
        }
    ], function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            console.log(result);
            return res.send(result);
        }
    });
};

exports.postDevice = function (req, res) {
    console.log('**********postDevice***********');

    var data = req.body.data;

    var device = data.device;

    console.log(device);

    async.parallel({
        device: function (done) {
            Device.save(device, function (err, value) {
                done(err, value);
            });
        }
    }, function (err, results) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            console.log(results.device);

            return res.send({result:'success'});
        }
    });
};

exports.deleteDevice = function (req, res) {
    console.log('*********deleteDevice************');

    var id = req.params.id;

    Device.deleteDevice(id, function(err, result){
        if(err){
            console.log(err.message);
            res.status(500).send({error: err.message});
        }else{
            return res.send(result);
        }
    });
};

exports.updateDevice = function(req, res){
    console.log('*********updateDevice************');

    var data = req.body.data;
    var device = data.device;
    Device.updateDevice(device, function(err, result){
        if(err){
            console.log(err.message);
            res.status(500).send({error: err.message});
        }else{
            return res.send(result);
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
