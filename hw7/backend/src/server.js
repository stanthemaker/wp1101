const mongoose = require("mongoose");
const dotenv = require("dotenv-defaults");
const User = require("./models/user.js");
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("mongo db connection established"));

const saveUser = async (id, name) => {
	const existing = await User.findOne({ name });
	if (existing) throw new Error(`data ${name} exists!!`);
	try {
		const newUser = new User({ id, name });
		console.log("Created user", newUser);
		return newUser.save();
	} catch (e) {
		throw new Error("User creation error: " + e);
	}
};

const deleteDB = async () => {
	try {
		await User.deleteMany({});
		console.log("Database deleted");
	} catch (e) {
		throw new Error("Database deletion failed");
	}
};
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
	await deleteDB();
	await saveUser(57, "Ric");
	await saveUser(108, "Sandy");
	await saveUser(77, "Peter");
});
