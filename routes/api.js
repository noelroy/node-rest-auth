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
  if(!req.body.username || ! req.body.password) {
    res.json({sucess: false, msg: "Please pass username and password"});
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
  })
})

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Page under construction.');
  });

module.exports = router;
