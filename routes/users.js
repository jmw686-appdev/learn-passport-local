var express = require('express');
var router = express.Router();
require('../passport');
var passport = require('passport');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
   res.render('users/index', {users: users});
  });
});

// Login
router.get('/login', function(req, res){
  if (req.user) {
    res.redirect('/users/'); //+ req.user.username)
  }
	res.render('users/login');
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login'
  }), (req, res) =>
    res.redirect('/users/')
);

// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/signup', function(req, res){
	res.render('users/signup');
});

router.post('/signup', function(req, res){
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.createUser(newUser, function(err, user){
    console.log('callback: ' + user.username);
  });
  // user.save().then(result => {
  //   console.log(result);
  // }).catch(err => console.log(err));
	res.redirect('/');
});
module.exports = router;
