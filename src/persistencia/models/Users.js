import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	admin: {
		type: Boolean,
		default: false,
		required: true
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model('users', UserSchema);

export {UserModel};
