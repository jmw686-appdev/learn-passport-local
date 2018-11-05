var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
});

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      user.comparePassword(password, user.password, function (err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }
        return done(null, user);
      });
    });
  }
));
