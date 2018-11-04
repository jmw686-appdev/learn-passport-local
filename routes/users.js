var express = require('express');
var router = express.Router();

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
    successRedirect: '/users/',
    failureRedirect: '/users/login'
  }));
// Login
router.get('/signup', function(req, res){
	res.render('users/signup');
});

router.post('/signup', function(req, res){
  const user = new User({
		username: req.body.username,
		password: req.body.password
	});
  user.save().then(result => {
    console.log(result);
  }).catch(err => console.log(err));
	res.redirect('/');
});
module.exports = router;
