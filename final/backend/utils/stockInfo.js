const yahooFinance = require("yahoo-finance");

yahooFinance.quote(
	{
		symbol: "2330",
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
