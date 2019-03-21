var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.testStatics = function(password) {
    console.log(password + " - datest");
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', async function() {
    console.log("==>" + JSON.stringify(this));
    this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null)
});

userSchema.pre('findOneAndUpdate', async function() {
    console.log("==>" + JSON.stringify(this._update));
    if (this._update.password.length == 0) {
        this._update = {
            "fullname": this._update.fullname
        };
    }
    else {
        this._update = {
            "fullname": this._update.fullname,
            "password": await bcrypt.hashSync(this._update.password, bcrypt.genSaltSync(8), null)
        };
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
