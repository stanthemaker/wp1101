import { useState, uesEffect } from "react";
const useChat = () => {
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState({});
	const client = new WebSocket("ws://localhost:4000");
	const sendData = async (data) => {
		const message = await JSON.stringify(data);
		console.log("data sent from client:", message);
		await client.send(message);
	};
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
	const sendMessage = (payload) => {
		console.log("playload :", payload);
		sendData(["input", payload]);
	};
	const clearMessages = () => {
		sendData(["clear"]);
	};

	return {
		status,
		messages,
		sendMessage,
		clearMessages,
	};
};

export default useChat;
