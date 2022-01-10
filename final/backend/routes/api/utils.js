const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios").default;
const Parser = require("expr-eval").Parser;

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
exports.runModel = async (req, res) => {
	//there should be limit on the ineq
	const tag = "AAPL";
	let model = "P + R > 2";
	let PE = 0;
	let ROET4Q = 0;
	let currentRatio = 0;
	let GrossMargin = 0;

	await request(
		`https://statementdog.com/api/v2/fundamentals/${tag}/2017/2022/cf?qbu=true&qf=analysis`,
		(err, response, body) => {
			const content = JSON.parse(body);
			// console.log(content);
			//features below is last quarter
			PE = content["common"]["LatestValuation"]["data"]["PE"]; //current price
			ROET4Q = content["quarterly"]["ROET4Q"]["data"].slice(-1)[0][1] / 100;
			currentRatio =
				content["quarterly"]["CurrentRatio"]["data"].slice(-1)[0][1] / 100;
			GrossMargin = content["quarterly"]["GrossMargin"]["data"].slice(-1)[0][1];
		}
	);
	const index = model.indexOf(">");
	const LHS = Parser.parse(model.slice(0, index - 1).trim());
	const RHS = Parser.parse(model.slice(index + 1).trim());
	const LHSvalue = LHS.evaluate({
		P: PE,
		R: ROET4Q,
		G: GrossMargin,
		C: currentRatio,
	});
	const RHSvalue = RHS.evaluate({
		P: PE,
		R: ROET4Q,
		G: GrossMargin,
		C: currentRatio,
	});
	if (LHSvalue > RHSvalue) {
		console.log("pass!!");
	} else {
		console.log("fail");
	}
};
