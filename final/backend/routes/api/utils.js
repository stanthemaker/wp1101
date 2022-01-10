const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios").default;

exports.marketHeadline = async (req, res) => {
	await request("https://www.cnbc.com/stocks/", (err, response, html) => {
		if (!err && response.statusCode === 200) {
			// console.log(html);
			const cssSelector =
				"#SectionWithoutNativeTVE-TwoColumnImageDense-stocks-4 > div > div:nth-child(1) > div.Column-imageDenseModRight > div > div > div > div:nth-child(1) > div > a > div";
			const $ = cheerio.load(html);
			$(cssSelector).each((i, element) => {
				const headline = $(element).text();
				res.status(200).send({ message: "success", headline: headline });
			});
		} else {
			console.log("err:", err);
			res.status(500).send({ message: "error" });
		}
	});
};
exports.stockInfo = async (req, res) => {
	const tags = req.query.tags;
	let companies = [];
	for (let i in tags) {
		console.log(tags[i]);
		let options = {
			method: "GET",
			url: `https://realstonks.p.rapidapi.com/${tags[i]}`,
			headers: {
				"x-rapidapi-host": "realstonks.p.rapidapi.com",
				"x-rapidapi-key": "767b545ad0mshf942c9a40d8b189p100638jsn95d6fb9a3a1b",
			},
		};
		await axios
			.request(options)
			.then(function (response) {
				companies.push({
					tag: tags[i],
					lastPrice: response.data.price,
					changePercentage: response.data.change_percentage,
				});
			})
			.catch(function (error) {
				res.status(500).send({ message: "server error" });
				console.error("error: ", error);
				return;
			});
	}
	res.status(200).send({ message: "success", companies: companies });
};
