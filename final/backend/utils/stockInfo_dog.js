const axios = require("axios").default;
const options = {
	method: "GET",
	url: ` https://statementdog.com/api/v2/fundamentals/NIO/2017/2022/cf?qbu=true&qf=analysis`,
};
axios.request(options).then(function (response) {
	if (response.data.hasOwnProperty("error")) {
		res.send({ message: response.data.error.message });
		return;
	}
	const PE = response.data["common"]["LatestValuation"]["data"]["PE"]; //latest PE
	const ROET4Q =
		response.data["quarterly"]["ROET4Q"]["data"].slice(-1)[0][1] / 100;
	const currentRatio =
		response.data["quarterly"]["CurrentRatio"]["data"].slice(-1)[0][1] / 100;
	const GrossMargin =
		response.data["quarterly"]["GrossMargin"]["data"].slice(-1)[0][1];
	console.log(typeof PE);
	console.log(GrossMargin);
});
