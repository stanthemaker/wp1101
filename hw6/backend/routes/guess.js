const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
	const number = getNumber();
	const guessed = roughScale(req.query.number, 10);
	// check if NOT a num or not in range [1,100]
	if (!guessed || guessed < 1 || guessed > 100) {
		res.status(406).send({ msg: "Not a legal number." });
	} else if (number === guessed) {
		// res.status(= Equal)
	}
});
module.exports = router;
