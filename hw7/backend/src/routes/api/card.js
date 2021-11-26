const express = require("express");
const router = express.Router();
const ScoreCard = require("../../models/ScoreCard.js");
exports.clearDB = async (req, res) => {
	try {
		await ScoreCard.deleteMany({});
		console.log("Database deleted");
		res.status(200).send({ message: "Database clear" });
	} catch (e) {
		throw new Error("Database deletion failed");
	}
};
exports.createScoreCard = async (req, res) => {
	const data = req.body;
	const name = data.name;
	const subject = data.subject;
	const score = data.score;

	const existing = await ScoreCard.findOne({ name: name, subject: subject });
	if (existing) {
		try {
			ScoreCard.updateOne({ name: name, subject: subject }, { score: score });
			res
				.status(200)
				.send({ message: `Updating (${name}, ${subject}, ${score})` });
			return;
		} catch (e) {
			throw new Error("ScoreCard updating error: " + e);
		}
	}
	try {
		const newScoreCard = new ScoreCard(data);
		console.log("Created scorecard", newScoreCard);
		newScoreCard.save();
		// "Adding (Name, Subject, Score)”
		res.status(200).send({ message: `Adding (${name}, ${subject}, ${score})` });
		return;
	} catch (e) {
		throw new Error("ScoreCard creation error: " + e);
	}
};
exports.qeueryScoreCard = async (req, res) => {
	const query_type = req.query.type;
	const queryString = req.query.queryString;
	// ScoreCard.find
	console.log("query_type = " + query_type);
	console.log("queryString = " + queryString);
	// dynamically set query
	let query = {};
	query[query_type] = queryString;
	let result = {};
	ScoreCard.find(query).exec((err, r) => {
		if (err) {
			console.log("what is err", err);
		} else {
			// console.log("r = " + r.name);
			let message = [];
			for (let i = 0; i < r.length; i++) {
				message[
					i
				] = `name:${r[i].name}, subject:${r[i].subject}, score:${r[i].score}`;
			}
			res.status(200).send({ messages: message });
		}
	});
	// console.log("result = " + result);
};
