const User = require('../models/user.model.js');
const passport = require('passport');

exports.index = async (req, res) => {
    res.render('pages/index', {
        user: req.user
    });
};

exports.loginUser = async (req, res, next) => {

    await passport.authenticate('local-login', function (err, user, info) {

        if (err) {
            console.log("local-login error", err);
            return next(err); // will generate a 500 error
        }

        if (!user) {
            return res.render('pages/login', {
                message: info.message
            });
        }

        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************

        req.login(user, loginErr => {
            if (loginErr) {
                console.log("loginerr", loginErr)
                return next(loginErr);
            }

            return res.redirect("/user");

        });
    })(req, res, next);
};

exports.signupUser = async (req, res, next) => {

    await passport.authenticate('local-signup', function (err, user, info) {

        if (err) {
            console.log("local-signup error", err);
            return next(err); // will generate a 500 error
        }

        if (!user) {
            return res.render('pages/user_register', {
                message: info.message
            });
        }

        return res.render('pages/user', {
            message: "Nhập thông tin đăng nhập"
        });
    })(req, res, next);
};


// ES6 async/await
exports.indexUser = async (req, res) => {
    try {
        let users = await User.find();
        res.render('pages/user_index', {
            users: users,
            user: req.user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users."
        });
    }
};

//TODO ES6 async/await
exports.editUser = async (req, res) => {
    await User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.render('pages/user_edit', {
                user: user
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};


exports.updateUser = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.body._id }, {
            //TODO $chưa hiểu biến $set
            /*$set: {
                fullname: req.body.fullname
            }*/
            fullname: req.body.fullname,
            password: req.body.password
        }, { new: true });
        res.redirect("/");
    }
    catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving users."
        });
    }
};

exports.deleteUser = async (req, res) => {
    console.log("vào đây");
    /*
        try {
            await User.findOneAndRemove({ _id: req.params.userId });
            res.redirect("/");
        }
        catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while retrieving users."
            });
        }*/
};

