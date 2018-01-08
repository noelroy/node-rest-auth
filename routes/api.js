var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
require('../config/passport')(passport);

var User = require('../models/user');
var Note = require('../models/note');

var router = express.Router();

router.post('/signup',function(req,res) {
  if(!req.body.username || !req.body.password) {
    res.json({success: false, msg: "Please pass username and password"});
  }
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if(err) {
      return res.json({err: false, msg: "Username already exists"});
    }
    res.json({sucess: true, msg: "user created"});
  });
});

router.post('/signin', function(req,res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if(err) {
      throw err;
    }
    if (!user) {
      res.status(401).send({success: false, msg: "User not found"});
    }
    else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if(!err && isMatch) {
          var token = jwt.sign(user.toJSON(), config.secret);
          res.json({sucess: true, token: 'JWT ' + token});
        }
        else {
          res.status(401).send({success:false, msg: "Wrong Password"});
        }
      });
    }
  });
});

getToken = function(headers) {
  if(headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length == 2) {
      return parted[1];
    }
    return null;
  }
  return null;
}

router.post('/note', passport.authenticate('jwt',{session: false}), function(req,res) {
  var token = getToken(req.headers);
  if(token) {
    console.log(req.body);
    var note = new Note({
      title: req.body.title,
      body: req.body.body
    });
    note.save(function(err) {
      if(err) {
        return res.json({success: false, msg: 'Note not saved'});
      }
      res.json({success: true, msg: "Note Created"});
    });
  }
  else {
    return res.status(403).send({success: false, msg: "Unauthorized"});
  }
});

router.get('/note', passport.authenticate('jwt',{session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Note.find(function(err, notes) {
      if(err) {
        return next(err);
      }
      res.json(notes);
    });
  }
  else {
    return res.status(403).send({success: false, msg: "Unauthorized"});
  }
})

module.exports = router;
