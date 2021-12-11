const getStockHeadline = require("../../utils/stock_headline");
exports.stockHeadline = async (req, res) => {
	const headline = await getStockHeadline();
	console.log(headline);
	res.status(200).send({ message: "success", headline: headline });
};
