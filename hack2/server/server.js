import express from "express";
import postRoute from "./routes/post";
import mongoose from "mongoose";
import { dataInit } from "./upload";

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

const port = process.env.PORT || 4000;
const dboptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// TODO 1: connect to your mongodb here
const dotenv = require("dotenv-defaults");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
	console.log("mongo db connection established");
	app.use("/api", postRoute);
	// if (process.env.MODE === "EXAM") {
	// 	console.log("sample data");
	// 	dataInit();
	// }

	app.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
