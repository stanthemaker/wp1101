const axios = require("axios").default;
const getNasdaqList = async (req, res) => {
	const options = {
		method: "GET",
		url: "https://api.nasdaq.com/api/quote/list-type/nasdaq100",
	};
	let Nasdaq100 = [];
	await axios.request(options).then((response) => {
		const data = response.data.data.data.rows;
		for (let i = 0; i < data.length; i++) {
			Nasdaq100.push(data[i].symbol);
		}
		console.log(Nasdaq100);
	});
};
getNasdaqList();
