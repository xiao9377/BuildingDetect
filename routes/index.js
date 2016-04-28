var express = require('express');
var router = express.Router();
var path = require('path');

var multer = require('multer');
var encode = require('../libs/encode');
var DateUtils = require('../libs/DateUtils');


// file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsContract')
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, encode.renameContractFile(file.originalname));
    }
});
var uploader = multer({storage: storage}).fields([{name: 'file', maxCount: 1}]);


var storageImport = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp')
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, file.originalname);
    }
});
var uploaderImport = multer({storage: storageImport}).fields([{name: 'file', maxCount: 1}]);


var storageDevice = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsDevice')
    },
    filename: function (req, file, cb) {
        cb(null, encode.renameDeviceFile(file.originalname));
    }
});
var uploaderDevice = multer({storage: storageDevice}).fields([{name: 'file', maxCount: 1}]);

var storageEmployee = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsEmployee')
    },
    filename: function (req, file, cb) {
        cb(null, encode.renameEmployeeFile(file.originalname));
    }
});
var uploaderEmployee = multer({storage: storageEmployee}).fields([{name: 'file', maxCount: 1}]);

var storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsFile')
    },
    filename: function (req, file, cb) {
        cb(null, encode.renameFile(file.originalname));
    }
});
var uploaderFile = multer({storage: storageFile}).fields([{name: 'file', maxCount: 1}]);

var user = require('../controllers/user');
var contract = require('../controllers/contract');
var report = require('../controllers/report');
var letter = require('../controllers/letter');
var project = require('../controllers/project');
var employee = require('../controllers/employee');
var device = require('../controllers/device');
var file = require('../controllers/file');
var static = require('../controllers/static');

/* GET register page */
router.get('/register', function(req, res, next){
    res.sendFile('views/register.html', {root: path.join(__dirname, '../public')});
});
//短信验证
//router.post('/getvalidcode', user.getValidCode);
router.post('/register', user.register);
router.post('/confirmregister', user.confirmRegister);

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.sendFile('views/login.html', {root: path.join(__dirname, '../public')});
});

router.post('/login', user.login);
router.get('/logout', user.logout);
router.get('/getuser', user.getUser);
router.get('/user/page/:page', user.getUserByPage);
router.get('/user/id/:id', user.getUserById);
router.get('/user/delete/:id', user.removeUser);
router.post('/user/updateAuth', user.updateUserAuth);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('views/index.html', {root: path.join(__dirname, '../public')});
});

router.get('/contract/getall', contract.getAllContracts);
router.get('/contract/id/:id', contract.getContractById);
router.get('/contract/page/:page', contract.getContractByPage);
router.post('/contract/post', contract.postContract);
router.post('/contract/add', contract.addContract);
router.get('/contract/delete/:id', contract.removeContract);
router.post('/contract/postpayment', contract.postPayment);
router.post('/contract/updatestate', contract.updateState);
router.post('/contract/upload', uploader, contract.upload);
router.post('/contract/import', uploaderImport, contract.import);
router.get('/contract/get/attachment', static.getContractAttachment);
router.get('/contract/file/templet', static.getContractInputTemplet);
router.get('/contract/state/:state', contract.getContractByState);

router.post('/report/post', report.postReport);
router.get('/report/page/:page', report.getReportByPage);

router.post('/letter/post', letter.postLetter);
router.get('/letter/page/:page', letter.getLetterByPage);

router.get('/project/page/:page', project.getProjectByPage);
router.get('/project/id/:id', project.getProjectById);

router.get('/file/page/:page', file.getFileByPage);
router.post('/file/post', file.postFile);
router.post('/file/upload',uploaderFile, file.uploadAttachment);
router.get('/file/get/attachment', static.getFileAttachment);

router.get('/employee/page/:page',employee.getEmployeeByPage);
router.get('/employee/id/:id', employee.getEmployeeById);
router.post('/employee/post', employee.postEmployee);
router.get('/employee/delete/:id', employee.deleteEmployee);
router.post('/employee/update', employee.updateEmployee);
router.post('/employee/upload',uploaderEmployee, employee.uploadAttachment);
router.get('/employee/get/attachment', static.getEmployeeAttachment);
router.get('/employee/get/phone', employee.getEmployeeByPhone);

router.get('/device/getall', device.getAllDevices);
router.get('/device/page/:page',device.getDeviceByPage);
router.get('/device/id/:id', device.getDeviceById);
router.post('/device/post', device.postDevice);
router.get('/device/delete/:id', device.deleteDevice);
router.post('/device/update', device.updateDevice);
router.post('/device/upload', uploaderDevice, device.uploadAttachment);
router.get('/device/get/attachment', static.getDeviceAttachment);

module.exports = router;
