const yahooFinance = require("yahoo-finance");

yahooFinance.quote(
	{
		symbol: "AAPL",
		modules: ["price"], // see the docs for the full list
	},
	function (err, quotes) {
		if (err) {
			console.log(err);
		} else {
			console.log(quotes);
		}
	}
);
