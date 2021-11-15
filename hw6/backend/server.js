const express = require("express");
const cors = require("cors");
const guessRoute = require("./routes/guess");
const startRoute = require("./routes/start");
const restartRoute = require("./routes/restart");

const app = express();

// init middleware
app.use(cors());

// define routes
app.use("/api/guess", guessRoute);
app.use("/api/start", startRoute);
app.use("/api/restart", restartRoute);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
