const User = require('../models/user.model.js');
const passport = require('passport');

exports.index = async (req, res) => {
    res.render('pages/index', {
        user: req.user,
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
            req.session.myuser = user;

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

        res.redirect("/user")

    })(req, res, next);
};


// ES6 async/await
exports.indexUser = async (req, res) => {
    try {
        let users = await User.find();
        res.render('pages/user_index', {
            message: req.flash("message"),
            users: users,
            user: req.user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users."
        });
    }
};

exports.editUser = async (req, res) => {
    let user = await User.findById(req.params.userId);
    try {
        if (!user) {
            res.status(404).send({
                message: "Can not find ID: " + req.params.userId
            });
        } else {
            res.render('pages/user_edit', {
                user: user
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
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

        req.flash("message", "Task Successful!");
        res.redirect("/user");
    }
    catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving users."
        });
    }
};

exports.deleteUser = async (req, res) => {
    if (req.params.userId != req.user._id) {
        try {
            await User.findOneAndRemove({ _id: req.params.userId });
            req.flash('message', 'Task Successful!!')
            res.redirect("/user");
        }
        catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while retrieving users."
            });
        }
    } else {
        req.flash('message', 'You can not delete yourself!')
        res.redirect("/user");
    }
};

