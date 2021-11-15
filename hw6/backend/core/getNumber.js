let number;

const getNumber = () => number;
const genNumber = () => {
	if (!number) {
		number = Math.floor(Math.random() * 100);
	}
	return number;
};

export { getNumber, genNumber };
