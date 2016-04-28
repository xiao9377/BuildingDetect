var Report = require('../dao').Report;

exports.postReport = function (req, res) {
    console.log('**********postReport***********');

    var report = req.body.data;

    Report.save(report, function (err, report) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            res.send({report: report});
        }
    });

};

exports.getReportByPage = function (req, res) {
    console.log('**********getReportByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);

    Report.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });

};