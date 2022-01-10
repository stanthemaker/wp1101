const userRouter = require("./api/user");
const utilRouter = require("./api/utils");
const modelRouter = require("./api/model");
const favoriteRouter = require("./api/favorite");
const wrap =
	(fn) =>
	(...args) =>
		fn(...args).catch(args[2]);

function main(app) {
	app.post("/stockalendar/register", wrap(userRouter.register));
	app.get("/stockalendar/login", wrap(userRouter.login));
	app.get("/stockalendar/Home/headline", wrap(utilRouter.marketHeadline));
	//Favorites
	app.get(
		"/stockalendar/myFavorites/userFavorites",
		wrap(favoriteRouter.userFavorites)
	);
	app.post(
		"/stockalendar/myFavorites/delFavorite",
		wrap(favoriteRouter.delFavorite)
	);
	app.post(
		"/stockalendar/myFavorites/addFavorites",
		wrap(favoriteRouter.addFavorites)
	);
	//Models
	app.get("/stockalendar/myModels/userModels", wrap(modelRouter.userModels));
	app.post("/stockalendar/myModels/addModel", wrap(modelRouter.addModel));
	app.post("/stockalendar/myModels/delModel", wrap(modelRouter.delModel));
	//other utils
	app.get("/stockalendar/myFavorites/stockInfo", wrap(utilRouter.stockInfo));
}

module.exports = main;
