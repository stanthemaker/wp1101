const express = require("express");
const cors = require("cors");
const guessRoute = require("./routes/guess.js");
const startRoute = require("./routes/start.js");
const restartRoute = require("./routes/restart.js");

const app = express();
// console.log("what is route: " + guessRoute);

// init middleware
app.use(cors());

// define routes
app.use("/api/guess", guessRoute);
app.use("/api/start", startRoute);
// app.use("/api/guess", startRoute);
app.use("/api/restart", restartRoute);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
