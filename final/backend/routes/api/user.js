const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user.js");
const saltRounds = 10;

exports.login = async (req, res) => {
	console.log("req.query: ", req.query);
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": `${name}` });
	console.log("found doc:", user);
	if (!user) {
		console.log("not found");
		res.status(404).send({ message: "unregistered" });
		return;
	}
	try {
		const inputPassword = req.query.password;
		const password = user.profile.password;
		const checked = await bcrypt.compare(inputPassword, password);
		checked
			? res.status(200).send({ message: "login success" })
			: // .redirect("stockalender/home")
			  res.status(403).send({ message: "wrong password" });
		return;
	} catch (e) {
		res.status(500).send({ message: "login failed" });
	}
};
// curl -X POST http://localhost:4000/stockalendar/register \ -H 'Content-Type:application/json' \ -d '{"name":"stan", "password":"1234" }'
exports.register = async (req, res) => {
	console.log("req.body:", req.body);
	const name = req.body.name;
	const password = req.body.password;
	const existed = await User.findOne({ name: name });
	if (existed) {
		res.status(409).send({ message: "Username already used" });
		return;
	}
	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);
		const user = {
			profile: {
				name: name,
				password: hashPassword,
			},
			favorites: [""],
			models: [""],
		};
		console.log("new User: " + newUser);
		const newUser = new User(user);
		newUser.save();
		res
			.status(200)
			.send({ message: "register success" })
			.redirect("stockalender/login");
		return;
	} catch (e) {
		throw new Error("register error: " + e);
	}
};
// exports.clearDB = async (req, res) => {
// 	try {
// 		await ScoreCard.deleteMany({});
// 		console.log("Database deleted");
// 		res.status(200).send({ message: "Database clear" });
// 	} catch (e) {
// 		throw new Error("Database deletion failed");
// 	}
// };
// exports.createScoreCard = async (req, res) => {
// 	const data = req.body;
// 	const name = data.name;
// 	const subject = data.subject;
// 	const score = data.score;

// 	const existing = await ScoreCard.findOne({ name: name, subject: subject });
// 	if (existing) {
// 		try {
// 			ScoreCard.updateOne({ name: name, subject: subject }, { score: score });
// 			res
// 				.status(200)
// 				.send({ message: `Updating (${name}, ${subject}, ${score})` });
// 			return;
// 		} catch (e) {
// 			throw new Error("ScoreCard updating error: " + e);
// 		}
// 	}
// 	try {
// 		const newScoreCard = new ScoreCard(data);
// 		console.log("Created scorecard", newScoreCard);
// 		newScoreCard.save();
// 		// "Adding (Name, Subject, Score)”
// 		res.status(200).send({ message: `Adding (${name}, ${subject}, ${score})` });
// 		return;
// 	} catch (e) {
// 		throw new Error("ScoreCard creation error: " + e);
// 	}
// };
// exports.qeueryScoreCard = async (req, res) => {
// 	const query_type = req.query.type;
// 	const queryString = req.query.queryString;
// 	// ScoreCard.find
// 	console.log("query_type = " + query_type);
// 	console.log("queryString = " + queryString);
// 	// dynamically set query
// 	let query = {};
// 	query[query_type] = queryString;
// 	let result = {};
// 	ScoreCard.find(query).exec((err, r) => {
// 		if (err) {
// 			console.log("what is err", err);
// 		} else {
// 			// console.log("r = " + r.name);
// 			let message = [];
// 			for (let i = 0; i < r.length; i++) {
// 				message[
// 					i
// 				] = `name:${r[i].name}, subject:${r[i].subject}, score:${r[i].score}`;
// 			}
// 			res.status(200).send({ messages: message });
// 		}
// 	});
// 	// console.log("result = " + result);
// };
