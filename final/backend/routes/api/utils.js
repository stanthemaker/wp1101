const request = require("request");
const cheerio = require("cheerio");
exports.stockHeadline = async (req, res) => {
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
