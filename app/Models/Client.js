const mongoose = require('mongoose');
const {Schema} = mongoose;

const clientSchema = new Schema({
	name: {type: String},
	email: {type: String, required: [true, 'email field required']},
	password: {type: String, required: [true, 'password field required']},
	refresh_token: {type: String},
	access_token: {type: String},

}, {
	collection: 'clients', 
	autoIndex: true,
	timestamps: true
});

module.exports = mongoose.model('Client', clientSchema); 