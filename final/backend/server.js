const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./mongo.js");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const path = require("path");
// define server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(express.json());
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../frontend", "build")));

db.on("error", (err) => console.log(err));
db.once("open", async () => {
	console.log("mongo db connection established");
	routes(app);
	app.get("/*", function (req, res) {
		res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
	});
	app.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
