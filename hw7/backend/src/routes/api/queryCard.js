const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("GET HTTP method on /api/queryCard");
});

module.exports = router;
