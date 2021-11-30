import fetch from "node-fetch";
const formula = (x, y) => {
	if (x === "NA" || y === "NA" || x === 0 || y === 0) return 0;
	return (
		1 / (x * y) +
		10 / x +
		(45 * y) / x +
		(120 * y ** 2) / x +
		(210 * y ** 3) / x +
		(252 * y ** 4) / x +
		(210 * y ** 5) / x +
		(120 * y ** 6) / x +
		(45 * y ** 7) / x +
		(10 * y ** 8) / x +
		y ** 9 / x
	);
};

const getCompanyFigures = async (company) => {
	// console.log(typeof company);
	const url =
		await `https://statementdog.com/api/v2/fundamentals/${company}/2016/2021/cf?qbu=true&qf=analysis`;
	const response = await fetch(url);
	const body = await response.json();
	const PE = await body["common"]["LatestValuation"]["data"]["PE"];
	const RoE = body["quarterly"]["ROET4Q"]["data"].slice(-1)[0][1] / 100;
	// console.log(R);
	console.log(`${company} : RoE ${RoE},  PE ${PE}`);
	return formula(PE, RoE);
};

console.log("score :", await getCompanyFigures("AAPL"));
