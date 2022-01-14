const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const userSchema = new Schema({
	profile: {
		name: { type: String, required: [true, "user field is required."] },
		password: { type: String, required: [true, "password field is required."] },
		email: { type: String, required: [true, "email field is required."] },
	},
	favorites: [
		{
			type: String,
		},
	],
	models: [
		{
			type: String,
		},
	],
	token: { type: String},
});
// Creating a table within database with the defined schema
const User = mongoose.model("user", userSchema);
// Exporting table for querying and mutating
module.exports = User;
