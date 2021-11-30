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

const get_info = (company, session) => {
	const url = `https://statementdog.com/api/v2/fundamentals/${company}/2016/2021/cf?qbu=true&qf=analysis`;
	const req = session.get(url);
	const content = json.loads(req.text);

	try {
		PE = content["common"]["LatestValuation"]["data"]["PE"];
	} catch (e) {
		PE = "NA";
	}
	try {
		ROE = content["quarterly"]["ROET4Q"]["data"][-1][1] / 100;
	} catch (e) {
		PE = "NA";
	}
	console.log(`company = ${company} , pe = ${PE} , RoE= ${ROE}`);
	return formula(PE, ROE);
};
const Example_module = (company) => {
	let session = requests.Session();
	const user_agent =
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36";
	session.headers = { "user-agent": user_agent };
	const score = get_info(company, session);
	console.log(`score = ${score}`);
	return;
};

Example_module("AAPL");
