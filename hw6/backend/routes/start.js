const express = require("express");
const router = express.Router();
const lib = require("../core/getNumber");
router.post("/", (_, res) => {
	let ans = lib.genNumber();
	res.json({ msg: "The game has started!" ,data: ans });
});

module.exports = router;
