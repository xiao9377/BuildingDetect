var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserSchema = Schema({
    name : String,
    password : String,
    phone : String,
    authority : {type: Number, default: 3}  // 权限:0 管理员， 1 信息员，2 普通职员 , 3 无权限
});

/*globel db*/
mongoose.model('user', UserSchema);
