const userRouter = require("./api/user");
const utilRouter = require("./api/utils");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.get("/stockalendar/login", wrap(userRouter.login));
	app.get("/stockalendar/Home/headline", wrap(utilRouter.stockHeadline));
	app.get(
		"/stockalendar/myFavorites/userFavorites",
		wrap(utilRouter.userRouter.userFavorites)
	);
	app.post("/stockalendar/register", wrap(userRouter.register));
	app.post(
		"/stockalendar/myFavorites/addFavorite",
		wrap(userRouter.addtoFavorites)
	);
	// app.delete("/api/clear-db", wrap(scoreCardRouter.clearDB));
	// app.post("/api/create-card", wrap(scoreCardRouter.createScoreCard));
	// app.get("/api/query-cards", wrap(scoreCardRouter.qeueryScoreCard));
}

module.exports = main;
