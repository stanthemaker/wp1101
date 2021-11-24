const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
	Name: String,
	Subject: String,
	Score: Number,
});
const User = mongoose.model("ScoreCard", ScoreCardSchema);

module.exports = User;
