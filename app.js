var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multiparty = require('connect-multiparty');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var settings = require('./settings');

var routes = require('./routes/index');

var app = express();

// view engine setup
// view engine setup
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(multiparty({
//    uploadDir: config.tmp
//}));

const connection = mongoose.createConnection(settings.db);
app.use(session({
    secret: settings.secret,
    key: settings.key,
    cookie: {
        maxAge: 1000*60*60*24*30   // 30 days
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: connection
    })
}));

// 增加登录验证
app.use(function(req, res, next){
    if(!req.session['user']){
        if(req.url == '/login' || req.url == '/register' || req.url == '/confirmregister'){
            next();
        }else{
            res.redirect('/login');
        }
    }else if(req.session['user']){
        //console.log(req.session['user']);
        next();
    }
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        /*res.render('error', {
         message: err.message,
         error: err
         });*/
        console.log(err.message);
        res.send({error: err.message});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
     message: err.message,
     error: {}
     });*/
    console.log(err.message);
    res.send({error: err.message});
});

module.exports = app;
