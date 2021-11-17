import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:4000/api" });
// console.log("what is instance", instance);

const startGame = async () => {
	const {
		data: { msg, data },
	} = await instance.post("/start");
	console.log("answer = ", data);
	return msg;
};
const guess = async (number) => {
	try {
		const {
			data: { status },
		} = await instance.get("/guess", { params: { number: number } });
		return status;
	} catch (error) {
		console.error(error);
		return "Invalid input";
	}
};
const restart = async () => {
	const {
		data: { msg, data },
	} = await instance.post("/restart");
	console.log("answer = ", data);
	return msg;
};
export { startGame, guess, restart };
