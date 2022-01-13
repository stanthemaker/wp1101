const request = require("request");
const cheerio = require("cheerio");
const getStockHeadline = async () => {
	await request("https://www.cnbc.com/stocks/", (err, res, html) => {
		if (!err && res.statusCode === 200) {
			// console.log(html);
			const cssSelector =
				"#SectionWithoutNativeTVE-TwoColumnImageDense-stocks-4 > div > div:nth-child(1) > div.Column-imageDenseModRight > div > div > div > div:nth-child(1) > div > a > div";
			const $ = cheerio.load(html);
			$(cssSelector).each((i, element) => {
				const headline = $(element).text();
				console.log("head from stock:", headline);
				return headline;
			});
		} else {
			console.log("err:", err);
		}
	});
};
module.exports = getStockHeadline;
