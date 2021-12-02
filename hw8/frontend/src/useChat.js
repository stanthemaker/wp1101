import { useState } from "react";
const client = new WebSocket("ws://localhost:4000");
const sendData = async (data) => {
	await client.send(JSON.stringify(data));
};
const useChat = () => {
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState({});
	const sendMessage = (payload) => {
		sendData(["input", payload]);
	};
	const clearMessages = () => {
		sendData(["clear"]);
	};
	client.onmessage = (byteString) => {
		const { data } = byteString;
		const [task, payload] = JSON.parse(data);
		console.log("client received task :", task, ",  playload :", payload);
		switch (task) {
			case "output": {
				setMessages(() => [...messages, ...payload]);
				break;
			}
			case "status": {
				setStatus(payload);
				break;
			}
			case "init": {
				setMessages(() => payload);
				break;
			}
			case "cleared": {
				setMessages([]);
				break;
			}
			// case "defaultUsername": {
			// }
			default:
				break;
		}
	};

	return {
		status,
		messages,
		sendMessage,
		clearMessages,
	};
};

export default useChat;
