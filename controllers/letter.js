var Letter = require('../dao').Letter;

exports.postLetter = function (req, res) {
    console.log('**********postLetter***********');

    var letter = req.body.data;

    Letter.save(letter, function (err, letter) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            res.send({letter: letter});
        }
    });
};

exports.getLetterByPage = function (req, res) {
    console.log('**********getLetterByPage***********');

    var page = req.params.page;
    var number = parseInt(req.query.number);

    Letter.findByPage(number, page, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        } else {
            return res.send(result);
        }
    });
};