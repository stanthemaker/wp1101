const mongoose = require("mongoose");
const dotenv = require("dotenv-defaults");
dotenv.config();

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL!");
	process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
module.exports = db;
// module.exports = db;
