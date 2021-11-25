const ScoreCard = require("../../models/ScoreCard.js");

exports.qeueryScoreCard = async (req, res, next) => {
	let query = req.params.query;
	// ScoreCard.find
	console.log("query = " + query);
};
