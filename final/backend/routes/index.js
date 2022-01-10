const userRouter = require("./api/user");
const utilRouter = require("./api/utils");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.post("/stockalendar/register", wrap(userRouter.register));
	app.get("/stockalendar/login", wrap(userRouter.login));
	app.get("/stockalendar/Home/headline", wrap(utilRouter.marketHeadline));
	//userFavorites
	app.get(
		"/stockalendar/myFavorites/userFavorites",
		wrap(userRouter.userFavorites)
	);
	app.post(
		"/stockalendar/myFavorites/delFavorite",
		wrap(userRouter.delFavorite)
	);
	app.post(
		"/stockalendar/myFavorites/addFavorite",
		wrap(userRouter.addtoFavorites)
	);
	//userModels

	//other utils
	app.get("/stockalendar/myFavorites/stockInfo", wrap(utilRouter.stockInfo));
}

module.exports = main;
