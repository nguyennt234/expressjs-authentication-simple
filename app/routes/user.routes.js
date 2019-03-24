module.exports = (app, isAuth) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.get('/register', function (req, res, next) {
        res.render("pages/user_register");
    });

    app.get('/login', function (req, res, next) {
        res.render("pages/login");
    });

    app.get('/user', isAuth, user.indexUser);

    app.get('/user/edit/:userId', isAuth, user.editUser);

    app.get('/user/delete/:userId', isAuth, user.deleteUser);

    app.post('/user/update/', isAuth, user.updateUser);

    app.post('/login', user.loginUser);

    app.post('/signup', user.signupUser);

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


}
