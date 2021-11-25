// const bodyParser = require("bodyParser");
const scoreCardRouter = require("./api/card");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.post("/api/create-card", wrap(scoreCardRouter.createScoreCard));
	app.get("/api/query-cards", wrap(scoreCardRouter.qeueryScoreCard));
}

module.exports = main;
