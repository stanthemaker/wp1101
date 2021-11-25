const db = require("./mongo.js");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
// define server
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
db.on("error", (err) => console.log(err));
db.once("open", async () => {
	console.log("mongo db connection established");
	routes(app);
	app.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
