// load all the things we need
//const passport = require('passport');

module.exports = (passport) => {
    const LocalStrategy = require('passport-local').Strategy;
    const User = require('../app/models/user.model');

    passport.serializeUser(function (user, done) {
        console.log("serializeUser");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("deserializeUser-" + id);
        try {
            let user = await User.findOne({ "_id": id });
            if (!user) {
                return done(new Error("Không tìm thấy tài khoản"));
            }
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    });

    //Passport register
    //TODO ES6 async/await
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passswordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        let user = await User.findOne({ "email": email });
        try {
            if (!user) {
                console.log('Không tìm thấy tài khoản');
                return done(null, false, {
                    message: 'Không tìm thấy tài khoản'
                });
            }
            else if (await user.validPassword(password) == false) {
                console.log('Sai mật khẩu');
                return done(null, false, {
                    message: 'Sai mật khẩu'
                });
            }
            else {
                return done(null, user);
            }

        }
        catch (e) {
            console.log("myerror:" + e);
            return done(e);
        }

    }));

    //TODO ES6 async/await
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passswordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        let user = await User.findOne({ "email": email });
        try {
            if (user) {
                console.log('email đã tồn tại');
                return done(null, false, {
                    message: 'Email đã được sử dụng, vui lòng chọn email khác'
                });
            }
            else {
                var newUser = new User();
                newUser.email = email;
                newUser.fullname = req.body.fullname;
                newUser.password = password;
                newUser.save(function (err, result) {
                    if (err) {
                        return done(err);
                    }
                    else {
                        return done(null, newUser);
                    }
                });
            }

        }
        catch (e) {
            return done(e);
        }

    }));
}