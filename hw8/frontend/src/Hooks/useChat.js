import { useState } from "react";

const client = new WebSocket("ws://localhost:4000");

const useChat = () => {
	const [messages, setMessages] = useState([
		{ name: "Ric", body: "Hello?" },
		{ name: "Mary", body: "Hi!" },
	]);
	const [status, setStatus] = useState({});

	client.onmessage = (byteString) => {
		const { data } = byteString;
		const [task, payload] = JSON.parse(data);
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
			default:
				break;
		}
	};

	const sendData = async (data) => {
		await client.send(JSON.stringify(data));
	};

	const sendMessage = (payload) => {
		sendData(["input", payload]);
	};
	const clearMessages = () => {
		sendData(["clear"]);
	};

	return {
		messages,
		clearMessages,
		sendMessage,
	};
};

export default useChat;
