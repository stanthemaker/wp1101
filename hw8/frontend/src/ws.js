const client = new WebSocket("ws://localhost:4000");
const sendData = async (data) => {
	await client.send(JSON.stringify(data));
};
export { sendData };
