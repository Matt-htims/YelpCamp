const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

// This following line adds in username and password to our Schema for us
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
