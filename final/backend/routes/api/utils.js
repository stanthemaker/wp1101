const request = require("request");
const cheerio = require("cheerio");
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
	let company = [];
	for (let tag in tags) {
		await request(
			`https://finance.yahoo.com/quote/${tag}?p=${tag}&.tsrc=fin-srch`,
			(err, response, html) => {
				if (!err && response.statusCode === 200) {
					// console.log(html);
					const cssSelector =
						"##quote-header-info > div.My(6px).Pos(r).smartphone_Mt(6px).W(100%) > div.D(ib).Va(m).Maw(65%).Ov(h) > div.D(ib).Mend(20px) > fin-streamer.Fw(b).Fz(36px).Mb(-4px).D(ib)";
					const $ = cheerio.load(html);
					const price = $(cssSelector).text();
					console.log("price = ", price);
				} else {
					console.log("err:", err);
					res.status(500).send({ message: "error" });
				}
			}
		);
	}
};
