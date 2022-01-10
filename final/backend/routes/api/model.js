const User = require("../../models/user.js");
exports.userModels = async (req, res) => {
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.status(404).send({ message: "user not found" });
		return;
	}
	res.status(200).send({ message: "success", models: user.models });
};
exports.addModel = async (req, res) => {
	const name = req.body.name;
	const model = req.body.model; //a string
	try {
		await User.updateOne(
			{ "profile.name": name },
			{ $push: { models: model } }
		);
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(500).send({ message: "add Model error" });
		console.log(e);
	}
};
exports.delModel = async (req, res) => {
	const name = req.body.name;
	const model = req.body.model; //a string
	try {
		await User.updateOne(
			{ "profile.name": name },
			{ $pull: { models: model } }
		);
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(500).send({ message: "del Model error" });
		console.log(e);
	}
};
