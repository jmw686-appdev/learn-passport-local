var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', {users: User.find({})});
});

// Login
router.get('/login', function(req, res){
	res.render('users/login');
});

// Login
router.get('/signup', function(req, res){
	res.render('users/signup');
});

router.post('/signup', function(req, res){
  const user = new User({
		username: username,
		password: password
	});
  user.save().then(result => {
    console.log(result);
  }).catch(err => console.log(err));
	res.redirect('/');
});
module.exports = router;
