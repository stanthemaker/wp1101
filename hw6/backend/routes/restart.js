const express = require("express");
const router = express.Router();
const lib = require("../core/getNumber");

router.post("/", (_, res) => {
	lib.resetNumber();
	let ans = lib.genNumber();
	res.json({ msg: "The game has restarted!", data: ans });
});

module.exports = router;
