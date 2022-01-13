import mongoose from "mongoose";
import { dataInit } from "./upload.js";

const dotenv = require("dotenv-defaults");

async function connect() {
	// TODO 1.1 Connect your MongoDB
	dotenv.config();
	if (!process.env.MONGO_URL) {
		console.error("Missing MONGO_URL!");
		process.exit(1);
	}

	mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	dataInit();
}

export default { connect };
