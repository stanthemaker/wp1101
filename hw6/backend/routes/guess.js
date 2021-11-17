const express = require("express");
const router = express.Router();
const lib = require("../core/getNumber");
router.get("/", (req, res) => {
	const answer = lib.getNumber();
	const guessed = lib.roughScale(req.query.number, 10);
	// check if NOT a num or not in range [1,100]
	if (!guessed || guessed < 1 || guessed > 100) {
		res.status(406).send({ status: "Not a legal number.", guess: guessed });
		return;
	} else if (answer === guessed) {
		res.status(200).send({ status: "Equal" });
		return;
	}
	guessed > answer
		? res.status(200).send({ status: "smaller" })
		: res.status(200).send({ status: "bigger" });
	// guessed > answer ? res.status("smaller") : res.json({ msg: "bigger" });
});
module.exports = router;
