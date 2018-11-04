// make this available to our users in our Node applications
const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      URLSlugs = require('mongoose-url-slugs');

let userSchema = mongoose.Schema({
    username: {type: String, index: true},
    password: { type: String, default: null }
});

userSchema.plugin(URLSlugs('username'));

module.exports = mongoose.model('User', userSchema);

module.exports.comparePassword = (candidatePassword, hash, callback) =>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
