'use strict';
// Khai báo biến môi trường .env
require('dotenv').config();
// Khai báo ==================================================================
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const mPORT = process.env.PORT || 5000;

const session = require("express-session")
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuring the MongoDB thr =================================================
const dbConfig = process.env.DB_CONFIG;
// DB_CONFIG trong file .env
// DB_CONFIG = mongodb://admin:<password>@nguyennt234-shard-00-00-i2lw1.mongodb.net:27017,nguyennt234-shard-00-01-i2lw1.mongodb.net:27017,nguyennt234-shard-00-02-i2lw1.mongodb.net:27017/test?ssl=true&replicaSet=nguyennt234-shard-0&authSource=admin&retryWrites=true
// <password> Cần điền vào
mongoose.set('useCreateIndex', true);
(async () => {
    try {
        const connection = await mongoose.connect(dbConfig, { useNewUrlParser: true });
        if (connection === mongoose) {
            console.log("Successfully connected to the database");
        }
    } catch (err) {
        console.log('error: ' + err)
    }
})();

// set up our express application ============================================

// TODO: Nghiên cứu kỹ về views
//console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//use sessions for tracking logins
require('../config/passport')(passport);
app.use(session({
    secret: 'thoiquentot2', // session secret
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

const isAuth = async (req, res, next) => {
    if (await req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }
    // denied. redirect to login
    res.redirect('/login')
}

// Router ======================================================================
require('./routes/index.routes')(app);
require('./routes/user.routes')(app, isAuth);

// Error =======================================================================
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
    next(err);
});

// listen for requests ==========================================================
app.listen(mPORT, () => {
    console.log("Server is listening on port " + mPORT);
});
