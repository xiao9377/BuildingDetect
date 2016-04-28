var Project = require('../dao').Project;


exports.getProjectByPage = function (req, res) {
    console.log('**********getProjectByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);

    Project.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });

};

exports.getProjectById = function (req, res) {
    console.log('**********getProjectById***********');

    var id = req.params.id;

    Project.findById(id, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });

};