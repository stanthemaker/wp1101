const mongoose = require("mongoose");
const dotenv = require("dotenv-defaults");
const ScoreCard = require("./models/ScoreCard.js");
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("mongo db connection established"));
const db = mongoose.connection;
module.exports = db;