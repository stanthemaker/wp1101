const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
	name: String,
	subject: String,
	score: Number,
});
const ScoreCard = mongoose.model("ScoreCard", ScoreCardSchema);

module.exports = ScoreCard;
