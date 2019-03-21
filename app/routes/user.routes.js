module.exports = (app, passport) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.get('/register', function(req, res, next) {
        res.render("pages/user/register");
    });

    app.get('/login', function(req, res, next) {
        res.render("pages/login");
    });

    app.get('/user/edit/:userId', user.editUser)

    app.post('/user/update/', user.updateUser)

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {

            if (err) {
                console.log("local-login error", err);
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status

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

                //res.cookie('first_name', user.first_name);
                //res.cookie('user_id', user.uuid);

                return res.redirect("/");

            });
        })(req, res, next);
    });

    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {

            if (err) {
                console.log("local-signup error", err);
                return next(err); // will generate a 500 error
            }

            if (!user) {
                return res.render('pages/register', {
                    message: info.message
                });
            }

            return res.render('pages/login', {
                message: "Xin vui long dang nhap"
            });
        })(req, res, next);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


}
