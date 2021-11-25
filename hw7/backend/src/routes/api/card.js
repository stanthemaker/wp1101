const express = require("express");
const router = express.Router();
const ScoreCard = require("../../models/ScoreCard.js");
exports.createScoreCard = async (req, res) => {
	let data = req.body;
	console.log("Creating scorecard , data = ", data);
	res.send("post receive");
	// ScoreCard.create(data, (err, user) => {
	// 	if (err) {
	// 		console.log("create err");
	// 		res.status(403).send({ message: "error" });
	// 	} else {
	// 		res.status(200).send({ message: "success" });
	// 	}
	// });
};
exports.qeueryScoreCard = async (req, res, next) => {
	const query_type = req.params.query_type;
	const queryString = req.params.queryString;
	// ScoreCard.find
	console.log("query = " + query);
};
