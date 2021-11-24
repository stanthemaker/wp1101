const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	id: Number, // Number is shorthand for {type: Number}
	name: String,
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
