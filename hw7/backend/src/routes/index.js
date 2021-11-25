// const bodyParser = require("bodyParser");
const express = require("express");
const router = express.Router();
const createCardRoute = require("./api/createCard.js");
const queryCardRoute = require("./api/queryCard.js");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.post("/api/createCard", wrap(createCardRoute.createScoreCard));
	app.get("/api/queryCard", wrap(queryCardRoute.qeueryScoreCard));
}

module.exports = main;
