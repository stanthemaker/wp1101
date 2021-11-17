let number;

const getNumber = () => number;
const genNumber = () => {
	if (!number) {
		number = Math.floor(Math.random() * 100) + 1;
	}
	return number;
};
const resetNumber = () => {
	number = 0;
};
const roughScale = (x, base) => {
	const parsed = parseInt(x, base);
	if (isNaN(parsed)) {
		return undefined;
	}
	return parsed;
};
module.exports = { getNumber, genNumber, roughScale, resetNumber };
