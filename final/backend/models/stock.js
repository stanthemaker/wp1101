const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const StockSchema = new Schema({
	user: {
		type: String,
		required: [true, "user field is required."],
	},
	// favorites: [
	// 	{
	// 		type: String,
	// 	},
	// ],
	// models: [
	// 	{
	// 		type: String,
	// 	},
	// ],
});
// Creating a table within database with the defined schema
const Stock = mongoose.model("stock", StockSchema);
// Exporting table for querying and mutating
module.exports = Stock;
