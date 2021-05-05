require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const debug = require('debug')('express-server:server');
const passport = require('passport');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');


require('./db');
require('./passport');

//var indexRouter = require('./app_server/routes/index');
const indexApi = require('./routes/index');

app.use(logger('dev'));
app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use(passport.initialize());
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

app.use('/api', indexApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
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

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
