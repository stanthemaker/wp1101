const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../../models/user.js");

exports.login = async (req, res) => {
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.send({ message: "unregistered" });
		return;
	}
	try {
		const inputPassword = req.query.password;
		const password = user.profile.password;
		const checked = await bcrypt.compare(inputPassword, password);
		checked
			? res
					.status(200)
					.send({
						message: "success",
						favorites: user.favorites,
						models: user.models,
					})
			: res.send({ message: "wrong password" });
		return;
	} catch (e) {
		res.send({ message: "login failed due to server error" });
	}
};
exports.register = async (req, res) => {
	const name = req.body.name;
	const password = req.body.password;
	const email = req.body.email;
	const existed = await User.findOne({ "profile.email": email });
	if (existed) {
		res.send({ message: "email already used" });
		return;
	}
	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);
		const user = {
			profile: {
				name: name,
				password: hashPassword,
				email: email,
			},
			favorites: [],
			models: [],
		};
		const newUser = new User(user);
		console.log("new User: " + newUser);
		newUser.save();
		res.status(200).send({ message: "success" });
	} catch (e) {
		console.log(e);
		res.send({ message: "register failed due to server error" });
	}
};
