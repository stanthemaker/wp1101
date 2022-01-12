const cheerio = require("cheerio");
const axios = require("axios").default;
const Parser = require("expr-eval").Parser;
const request = require("request");
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
	let companies = [""];
	for (let i in tags) {
		let options = {
			method: "GET",
			url: ` https://statementdog.com/api/v2/fundamentals/${tags[i]}/2017/2022/cf?qbu=true&qf=analysis`,
		};
		await axios
			.request(options)
			.then(function (response) {
				if (response.data.hasOwnProperty("error")) {
					res.status(404).send({ message: response.data.error.message });
				}
				const currentprice =
					response.data["common"]["StockInfo"]["data"][
						"latest_closing_price"
					].slice(11);
				const lastMonthavgPrice =
					response.data["monthly"]["Price"]["data"].slice(-1)[0][1];

				const changePercentage = (
					(parseFloat(currentprice) - parseFloat(lastMonthavgPrice)) /
					parseFloat(lastMonthavgPrice)
				)
					.toFixed(4)
					.toString();
				companies.push({
					tag: tags[i],
					lastPrice: currentprice,
					changePercentage: changePercentage,
				});
			})
			.catch(function (error) {
				console.error("error: ", error);
				res.status(500).send({ message: "error" });
				return;
			});
	}
	res.status(200).send({ message: "success", companies: companies });
};
exports.runModel = async (req, res) => {
	//there should be limit on the ineq
	const tags = req.query.tags;
	const model = req.query.model;
	let passedCompany = [];

	for (let i = 0; i < tags.length; i++) {
		const options = {
			method: "GET",
			url: `https://statementdog.com/api/v2/fundamentals/${tags[i]}/2017/2022/cf?qbu=true&qf=analysis`,
		};
		await axios
			.request(options)
			.then(function (response) {
				const PE = response.data["common"]["LatestValuation"]["data"]["PE"]; //latest PE
				const ROET4Q =
					response.data["quarterly"]["ROET4Q"]["data"].slice(-1)[0][1] / 100;
				const currentRatio =
					response.data["quarterly"]["CurrentRatio"]["data"].slice(-1)[0][1] /
					100;
				const GrossMargin =
					response.data["quarterly"]["GrossMargin"]["data"].slice(-1)[0][1];
				const inequation = Parser.parse(model);
				try {
					const result = inequation.evaluate({
						P: PE,
						R: ROET4Q,
						G: GrossMargin,
						C: currentRatio,
					});
					if (result === true) {
						passedCompany.push(tags[i]);
					}
				} catch (e) {
					res.status(500).send({ message: "evaluation error" });
					console.log(e);
				}
			})
			.catch(function (error) {
				res.status(500).send({ message: "error" });
				console.error("error: ", error);
				return;
			});
	}
	res.status(200).send({ message: "success", passedCompany: passedCompany });
};
exports.Nasdaq100List = async (req, res) => {
	const options = {
		method: "GET",
		url: "https://api.nasdaq.com/api/quote/list-type/nasdaq100",
	};
	let Nasdaq100List = [];
	await axios
		.request(options)
		.then((response) => {
			const data = response.data.data.data.rows;
			for (let i = 0; i < data.length; i++) {
				Nasdaq100List.push(data[i].symbol);
			}
		})
		.catch((error) => {
			res.send({ message: "Server error" });
			console.error("error: ", error);
			return;
		});
	res.status(200).send({ message: "success", Nasdaq100List: Nasdaq100List });
};
