require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var dbjs = require('./db');
var indexApi = require('./routes/index');
var passport = require('passport');
require('./passport')



var app = express();
app.use(bodyParser.json({ limit: '10mb' }))


// // Odprava varnostnih pomanjkljivosti
// app.disable('x-powered-by');
// app.use((req, res, next) => {
//     res.header('X-Frame-Options', 'DENY');
//     res.setHeader('X-XSS-Protection', '1; mode=block');
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     next();
// });

app.use(express.static(path.join(__dirname, '..', 'app', 'dist', 'app')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});
//

app.use('/api', indexApi);

app.get(/\/*/, (req, res, next) => {
    res.sendFile(path.join(__dirname, '..','app', 'dist','app', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        res.status(401).json({"sporočilo": err.name + ": " + err.message});
    }
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
