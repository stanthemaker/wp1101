const User = require("../../models/user.js");
exports.userFavorites = async (req, res) => {
	const name = req.query.username;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.status(404).send({ message: "user not found" });
		return;
	}
	res.status(200).send({ message: "success", favorites: user.favorites });
};
exports.addFavorites = async (req, res) => {
	const name = req.body.name;
	const tag = req.body.tag;
	console.log("requsted to add", tag);
	try {
		const user = await User.findOne({ "profile.name": name });
		const existed = user.favorites.includes(tag);
		if (existed) {
			res.send({ message: "Already exist" });
			return;
		}

		await User.updateOne(
			{ "profile.name": name },
			{ $push: { favorites: tag } }
		);
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(500).send({ message: "add Favorites error" });
		console.log(e);
	}
};
exports.delFavorite = async (req, res) => {
	const name = req.body.name;
	const tag = req.body.tag;
	try {
		await User.updateOne(
			{ "profile.name": name },
			{ $pull: { favorites: tag } }
		);
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(500).send({ message: "delete Favorite error" });
		console.log(e);
	}
};
