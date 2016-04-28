var Contract = require('../dao').Contract;
var Project = require('../dao').Project;

var async = require('async');
var fs = require('fs');
var XLSX = require('xlsx');
var DateUtils = require('../libs/DateUtils');

exports.getAllContracts = function (req, res) {
    console.log('**********getAllContracts***********');

    Contract.findAll(function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    })
};

exports.getContractByPage = function (req, res) {
    console.log('**********getContractByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);

    console.log(page);
    console.log(number);

    Contract.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.getContractByState = function (req, res) {
    console.log('**********getContractByState***********');
    var page = req.query.page;
    var number = parseInt(req.query.number);

    var state = req.params.state;

    Contract.findByState(state, page, number, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.getContractById = function (req, res) {
    console.log('**********findContractById***********');

    var id = req.params.id;

    async.waterfall([
        function (cb) {
            Contract.findById(id, function (err, contract) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, contract);
                }
            });
        },
        function (contract, cb) {
            Project.findByContractId(contract.id, function (err, project) {
                var result = {};
                if (err) {
                    cb(err);
                } else {
                    result.contract = contract;
                    result.project = project;
                    cb(null, result);
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

    /*async.parallel({
     project: function (done) {
     Project.findByContractId(id, function (err, value) {
     done(err, value);
     });
     },
     contract: function (done) {
     Contract.findById(id, function (err, value) {
     done(err, value);
     });
     }
     }, function (err, results) {
     if (err) {
     console.log(err.message);
     res.status(500).send({error: err.message});
     } else {

     console.log(results.project);
     console.log(results.contract);

     res.send({});
     }
     });*/
};

exports.postContract = function (req, res) {
    console.log('**********postContract***********');

    var data = req.body.data;

    var project = data.project;
    var contract = data.contract;

    //console.log(project);
    //console.log(contract);

    async.parallel({
        project: function (done) {
            Project.save(project, function (err, value) {
                done(err, value);
            });
        },
        contract: function (done) {
            Contract.save(contract, function (err, value) {
                done(err, value);
            });
        }
    }, function (err, results) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            res.send({result: 'success'});
        }
    });
};

var updatePayState = function () {
    console.log('----------updatePayState---------');
    Contract.findAll(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log(result);
            for (var i = 0; i < result.count; i++) {
                var payment = result.results[i].payment;
                payment.forEach(function (item) {
                    if (!item.isFinished && (DateUtils.dateDiff(item.time) <= 0)) {
                        Contract.updatePaystate(result.results[i]._id, 1, function (err) {
                            //console.log(err);
                        });
                    } else {
                        Contract.updatePaystate(result.results[i]._id, 0, function (err) {
                            //console.log(err);
                        });
                    }
                });
            }
        }
    });

};
//updatePayState();
setTimeout(updatePayState(),1000*60*60*12);

exports.addContract = function (req, res) {
    console.log('**********addContract***********');

    var data = req.body.data;

    var projectId = data.projectId;
    var contract = data.contract;
    //console.log(contract);

    async.parallel({
        project: function (done) {
            Project.pushContractId(projectId, contract.id, function (err, value) {
                done(err, value);
            });
        },
        contract: function (done) {
            Contract.save(contract, function (err, value) {
                done(err, value);
            });
        }
    }, function (err, results) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            res.send({result: 'success'});
        }
    });

};

exports.removeContract = function (req, res) {
    console.log('**********deleteContract***********');
    var id = req.params.id;
    Contract.removeContract(id, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.postPayment = function (req, res) {
    console.log('**********postPayment***********');
    var data = req.body.data;
    var contract = data.contract;
    Contract.postPayment(contract, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.updateState = function (req, res) {
    console.log('**********updateState***********');
    var contract = req.body.contract;
    //console.log(contract);
    Contract.updateState(contract, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};

exports.upload = function (req, res) {

    console.log('**********upload***********');

    var response = {
        originalname: req.files.file[0].originalname,
        filename: req.files.file[0].filename,
        path: req.files.file[0].path
    };

    console.log(response);

    res.json(response);
};

exports.import = function (req, res) {
    console.log('**********import***********');

    var path = 'temp/' + req.files.file[0].originalname;

    console.log(path);

    var datas = [];

    // 读取excel
    var workbook = XLSX.readFile(path);
    var sheetNames = workbook.SheetNames;
    //console.log(sheetNames);
    var sheet = workbook.Sheets[sheetNames[0]];
    //console.log(sheet['!ref']);
    var sheetJson = XLSX.utils.sheet_to_json(sheet, {header: 1});
    //console.log(sheetJson);

    var timeStr = DateUtils.getDateTimeString();
    var index = 1;
    var indexStr = '';

    var result = false;

    sheetJson.shift();  // 删除表头
    sheetJson.forEach(function (item) {

        console.log(item);

        var timeStr = DateUtils.getDateTimeString();
        if (index < 10) {
            indexStr = '0' + index;
        }

        var id = timeStr + indexStr;

        var contract = {};
        contract.id = '';
        contract.name = '';
        contract.isTemp = false;
        contract.startDate = '';
        contract.endDate = '';
        contract.type = '';
        contract.client = '';
        contract.detectItem = '';
        contract.structurePoint = '';
        contract.payment = [];
        contract.payState = 0;
        contract.total = 0;
        contract.state = 0;
        contract.attachment = '';
        contract.reportIds = [];
        contract.letters = [];
        contract.remark = '';
        contract.secretLevel = 5;

        var project = {};
        project.name = '';
        project.contractIds = [];
        project.areaCount = '';
        project.place = '';
        project.constructionUnit = '';
        project.structureType = '';

        if (('' !== item[0]) && item[0]) {
            id = item[0];
        } else {
            contract.isTemp = true;
        }

        project.name = item[6];
        project.contractIds.push(id);
        project.areaCount = item[9];
        project.place = item[7];
        project.constructionUnit = item[2];
        project.structureType = item[8];

        contract.id = id;
        contract.name = item[1];
        contract.client = item[2];
        contract.startDate = item[4];
        contract.endDate = item[5];
        contract.type = item[3];
        contract.structurePoint = item[10];
        contract.detectItem = item[11];
        contract.total = item[12];

        var firstFee = item[14];
        if (('' !== item[14]) && item[14]) {
            firstFee = item[12];
        }
        var firstTime = item[13];
        if (!(('' !== item[13]) && item[13])) {
            firstTime = DateUtils.getDateString();
        }
        contract.payment.push({fee: firstFee, time: firstTime, isFinished: false});

        if (('' !== item[15]) && item[15] && ('' !== item[16]) && item[16]) {
            contract.payment.push({fee: item[16], time: item[15], isFinished: false});
        }
        if (('' !== item[17]) && item[17] && ('' !== item[18]) && item[18]) {
            contract.payment.push({fee: item[18], time: item[17], isFinished: false});
        }

        contract.state = 0;
        contract.secretLevel = 5;

        var payment = contract.payment;
        payment.forEach(function (item) {
            if (!item.isFinished && (DateUtils.dateDiff(item.time) <= 0)) {
                contract.payState = 1;
            }else{
                contract.payState = 0;
            }
        });

        index++;

        if(contract.name == '' | contract.client=='' || contract.type=='' ||  contract.detectItem==''||
            project.name =='' || project.place=='' || project.constructionUnit == ''){
            return res.status(500).send({err: '缺少必需项！'});
        }

        async.parallel({
            project: function (done) {
                Project.save(project, function (err, value) {
                    done(err, value);
                });
            },
            contract: function (done) {
                Contract.save(contract, function (err, value) {
                    done(err, value);
                });
            }
        }, function (err, results) {
            if (err) {
                console.log(err.message);
                return res.status(500).send({error: err.message});
            } else {
                console.log('插入一条记录成功');
            }
        });
    });

    fs.unlink(path, function () {
        console.log('delete file success.');
    });

    res.status(200).json({result: 'import success.'});
};