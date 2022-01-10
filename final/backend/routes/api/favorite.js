const User = require("../../models/user.js");
exports.userFavorites = async (req, res) => {
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.status(404).send({ message: "user not found" });
		return;
	}
	res.status(200).send({ message: "success", favorites: user.favorites });
};
exports.addFavorites = async (req, res) => {
	const name = req.body.name;
	const tags = req.body.tags;
	try {
		User.updateOne(
			{ "profile.name": name },
			{ $push: { favorites: { $each: tags } } }
		);
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
