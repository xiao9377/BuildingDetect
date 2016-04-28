var File = require('../dao').File;

exports.postFile = function (req, res) {
    console.log('**********postFile***********');

    var data = req.body.data;
    var file = data.file;
    //console.log(file);
    File.save(file, function (err, file) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            res.send({file: file});
        }
    });

};

exports.getFileByPage = function (req, res) {
    console.log('**********getFileByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);

    File.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
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