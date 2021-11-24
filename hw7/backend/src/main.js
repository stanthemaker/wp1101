const db = require("./mongo.js");
db.on("error", (err) => console.log(err));
db.once("open", async () => {
	// await deleteDB();
	// await saveUser(57, "Ric");
	// await saveUser(108, "Sandy");
	// await saveUser(77, "Peter");
	console.log("db on ");
});
