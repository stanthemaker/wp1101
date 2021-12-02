import { useState, useEffect } from "react";
const client = new WebSocket("ws://localhost:4000");
const sendData = async (data) => {
	await client.send(JSON.stringify(data));
};

const useChat = () => {
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState({});
	const [defaultName, setDefaultName] = useState(""); // An
	const sendMessage = (payload) => {
		sendData(["input", payload]);
	};
	const clearMessages = () => {
		sendData(["clear"]);
	};
	const updateDefaultName = (username) => {
		sendData(["defaultName", { name: username }]);
	};
	// useEffect(() => {
	// 	console.log("defaultName changed inside:", defaultName);
	// }, [defaultName]);
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
			case "defaultName": {
				setDefaultName(payload.name);
			}
			default:
				break;
		}
	};

	return {
		status,
		messages,
		defaultName,
		sendMessage,
		clearMessages,
		updateDefaultName,
	};
};

export default useChat;
