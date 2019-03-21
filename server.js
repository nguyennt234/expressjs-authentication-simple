// set up ==================================================================
const express = require('express');
const app = express();
const passport = require('passport');
//const path = require('path');
const mongoose = require('mongoose');
const mPORT = process.env.PORT || 5000;
//const mIP = process.env.IP;

const session = require("express-session")
//var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuring the database =================================================
const dbConfig = "mongodb://admin:admin@nguyennt234-shard-00-00-i2lw1.mongodb.net:27017,nguyennt234-shard-00-01-i2lw1.mongodb.net:27017,nguyennt234-shard-00-02-i2lw1.mongodb.net:27017/taothoiquentot?ssl=true&replicaSet=nguyennt234-shard-0&authSource=admin&retryWrites=true";
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// set up our express application ============================================
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//use sessions for tracking logins
require('./config/passport');
app.use(session({
    secret: 'thoiquentot2', // session secret
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

let ensureLogin = async(req, res, next) => {
    if (await req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }
    // denied. redirect to login
    res.redirect('/login')
}

// Router ======================================================================
require('./app/routes/api.routes')(app);
require('./app/routes/index.routes')(app);
require('./app/routes/note.routes')(app, ensureLogin);
require('./app/routes/user.routes')(app, passport, ensureLogin);

// Error =======================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
    next(err);
});

// listen for requests ==========================================================
app.listen(mPORT, () => {
    console.log("Server is listening on port " + mPORT);
});
