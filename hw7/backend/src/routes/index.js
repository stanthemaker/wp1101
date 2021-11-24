const bodyParser = require("bodyParser");
const express = require("express");
const cors = require("cors");
const createCardRoute = require("./api/createCard.js");
const queryCardRoute = require("./api/queryCard.js");

const app = express();

// init middleware
app.use(cors());
app.use(bodyParser.json());
// define routes
app.use("/api/create-card", createCardRoute);
app.use("/api/query-cards", queryCardRoute);

// define server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
