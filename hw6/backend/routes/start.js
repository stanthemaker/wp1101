const express = require("express");
const router = express.Router();

router.post("/", (_, res) => {
	genNumber(); // 用亂數產生一個猜數字的 number
	res.json({ msg: "The game has started." });
});

module.exports = router;
