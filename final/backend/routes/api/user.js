const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../../models/user.js");

exports.login = async (req, res) => {
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.status(404).send({ message: "unregistered" });
		return;
	}
	try {
		const inputPassword = req.query.password;
		const password = user.profile.password;
		const checked = await bcrypt.compare(inputPassword, password);
		checked
			? res.status(200).send({ message: "login success" })
			: res.status(403).send({ message: "wrong password" });
		return;
	} catch (e) {
		res.status(500).send({ message: "login failed" });
	}
};
exports.register = async (req, res) => {
	const name = req.body.name;
	const password = req.body.password;
	const email = req.body.email;
	const existed = await User.findOne({ "profile.email": email });
	if (existed) {
		res.status(409).send({ message: "email already used" });
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
		res.status(500).send({ message: "register error" });
		console.log(e);
	}
};
