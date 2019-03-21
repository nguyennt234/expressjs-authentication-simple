let User = require('../models/user.model.js');

exports.index = async(req, res) => {
    //console.log(req.user.email);
    await User.find()
        .then(users => {
            var tagline = "...";
            res.render('pages/index', {                
                user: req.user,
                tagline: tagline,
                requestTime: req.requestTime
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.editUser = async(req, res) => {
    await User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.render('pages/user/users_edit', {
                user: user
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Update a note identified by the noteId in the request
exports.updateUser = async(req, res) => {
    //User.testStatics("Nguyên");
    if (!req.body._id) {
        res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    else {
        try {
            await User.findOneAndUpdate({ _id: req.body._id }, {
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
    }
};

// Retrieve and return all users from the database.
exports.findAll = async(req, res) => {
    await User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};
