const Parser = require("expr-eval").Parser;
const model = "x / y + z > 0";
try {
	const inequation = Parser.parse(model);
	// const result = inequation.evaluate({
	// 	x: 1,
	// 	y: 1,
	// });
	// console.log(result);
} catch (e) {
	console.log(e);
}
