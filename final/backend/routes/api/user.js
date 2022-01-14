const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
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
		if(checked){
			const token = jwt.sign(
				{user_id: user._id, name},
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				} 
			)
			user.token = token;
			console.log(token)
			res.cookie('token', token, {httpOnly: true});
			res
					.status(200) 
					.send({ 
						message: "success",
						favorites: user.favorites,
						models: user.models,
						token: user.token,
					})
		} else res.send({ message: "wrong password" });
		// checked
		// 	? res
		// 			.status(200)
		// 			.send({
		// 				message: "success",
		// 				favorites: user.favorites,
		// 				models: user.models,
		// 			})
		// 	: res.send({ message: "wrong password" });
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
		console.log(newUser)
		const token = jwt.sign(
			{user_id: newUser._id, name},
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		)
		newUser.token = token
		res.status(200).send({ message: "success" });
	} catch (e) {
		console.log(e);
		res.send({ message: "register failed due to server error" });
	}
};

exports.verifyToken = async (req, res)=>{
	console.log(req.headers)
	const token = req.headers['authorization'].split(' ')[1];
    // req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded =await jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;//unsure
		console.log(req.user)
		if(req.user)
			res.status(200).send({message: "Valid Token", user: req.user})
		else
			res.status(200).send({message: "not log in"})
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
}