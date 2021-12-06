const bodyParser = require("body-parser");
const db = require("./mongo.js");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
// define server
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
const port = process.env.PORT || 4000;

db.on("error", (err) => console.log(err));
db.once("open", async () => {
	console.log("mongo db connection established");
	routes(app);
	app.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
