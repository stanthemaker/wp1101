const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user.js");
const saltRounds = 10;

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
		return;
	} catch (e) {
		throw new Error("register error: " + e);
	}
};
exports.addtoFavorites = async (req, res) => {
	const name = req.body.name;
	const tags = req.body.tags;
	User.updateOne(
		{ "profile.name": `${name}` },
		{ $push: { favorites: { $each: tags } } }
	).exec((err, r) => {
		if (err) {
			res.status(403).send({ message: "addtoFavorite error" });
			console.log(err);
		} else {
			console.log("r = ", r);
			res.status(200).send({ message: "success" });
		}
	});
};
exports.userFavorites = async (req, res) => {
	const name = req.query.name;
	const user = await User.findOne({ "profile.name": name });
	if (!user) {
		res.status(404).send({ message: "user not found" });
		return;
	}
	res.status(200).send({ message: "success", favorites: favorites });
};
exports.delFavorite = async (req, res) => {
	const tag = req.body.tag;
	const tag = req.body.name;
	try {
		await User.updateOne(
			{ "profile.name": name },
			{ $pull: { favorites: tag } }
		);
		res.status(200).send({ message: "success" });
	} catch (err) {
		res.status(500).send({ message: "delete error" });
		console.log(err);
	}
};
