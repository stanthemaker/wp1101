let axios = require("axios").default;

let options = {
	method: "GET",
	url: "https://realstonks.p.rapidapi.com/AAPL",
	headers: {
		"x-rapidapi-host": "realstonks.p.rapidapi.com",
		"x-rapidapi-key": "767b545ad0mshf942c9a40d8b189p100638jsn95d6fb9a3a1b",
	},
};

axios
	.request(options)
	.then(function (response) {
		console.log(response.data.price);
	})
	.catch(function (error) {
		console.error(error);
	});
