// make this available to our users in our Node applications
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, index: true},
    password: { type: String, default: null }
});

module.exports = mongoose.model('User', userSchema);
