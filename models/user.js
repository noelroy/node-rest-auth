var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserScheme = new Schema ({
    username : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserScheme.pre('save',function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10,function(err,salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

UserScheme.methods.comparePassword = function(passwd,cb) {
    bcrypt.compare(passwd, this.password, function(err,isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserScheme);