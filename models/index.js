var mongoose = require('mongoose');
var config = require('../settings');

mongoose.connect(config.db, {
    server: {poolSize: 30}
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./user');
require('./contract');
require('./project');
require('./report');
require('./letter');
require('./employee');
require('./device');
require('./file');

exports.User = mongoose.model('user');
exports.Contract = mongoose.model('contract');
exports.Project = mongoose.model('project');
exports.Report = mongoose.model('report');
exports.Letter = mongoose.model('letter');
exports.Employee = mongoose.model('employee');
exports.Device = mongoose.model('device');
exports.File = mongoose.model('file');