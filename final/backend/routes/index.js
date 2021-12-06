const userRouter = require("./api/user");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.get("/stockalendar/login", wrap(userRouter.login));
	app.post("/stockalendar/register", wrap(userRouter.register));
	// app.delete("/api/clear-db", wrap(scoreCardRouter.clearDB));
	// app.post("/api/create-card", wrap(scoreCardRouter.createScoreCard));
	// app.get("/api/query-cards", wrap(scoreCardRouter.qeueryScoreCard));
}

module.exports = main;
