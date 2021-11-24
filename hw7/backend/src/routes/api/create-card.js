const express = require("express");
const router = express.Router();
const ScoreCard = require("../../models/ScoreCard.js");

const createScoreCard = (name, subject, score) => {
	try {
		const newcard = new ScoreCard({
			Name: name,
			Subject: subject,
			Score: score,
		});
		console.log("Created scorecard", newcard);
		return newcard.save();
	} catch (e) {
		throw new Error("Scorecard creation error: " + e);
	}
};

router.post("/", (req, res) => {
	createdscorecard = createScoreCard(
		req.params.name,
		req.params.subject,
		req.params.score
	);
	res.status(200).json({
		message: "Scorecard saved successfully",
		createdscorecard: createdscorecard,
	});
});

module.exports = router;
