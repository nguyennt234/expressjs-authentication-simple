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
                return done(new Error("Can not found user"));
            }
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    });

    //Passport register    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passswordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        let user = await User.findOne({ "email": email });
        try {
            if (!user) {
                return done(null, false, {
                    message: 'Can not found user'
                });
            }
            else if (await user.validPassword(password) == false) {
                console.log('Password Wrong!');
                return done(null, false, {
                    message: 'Password Wrong!'
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

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passswordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        let user = await User.findOne({ "email": email });
        try {
            if (user) {
                return done(null, false, {
                    message: 'Email existed!'
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