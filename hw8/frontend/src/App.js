import "./App.css";
import { Button, Input, Tag, message } from "antd";
import useChat from "./useChat";
import { useState, useEffect } from "react";

function App() {
	const { status, messages, sendMessage } = useChat();
	const [username, setUsername] = useState("");
	const [body, setBody] = useState(""); // textBody
	const displayStatus = (payload) => {
		if (payload.msg) {
			const { type, msg } = payload;
			const content = {
				content: msg,
				duration: 0.5,
			};
			switch (type) {
				case "success":
					message.success(content);
					break;
				case "error":
				default:
					message.error(content);
					break;
			}
		}
	};
	useEffect(() => {
		displayStatus(status);
	}, [status]);

	return (
		<div className="App">
			<div className="App-title">
				<h1>Simple Chat</h1>
				<Button type="primary" danger>
					Clear
				</Button>
			</div>
			<div className="App-messages">
				{messages.length === 0 ? (
					<p style={{ color: "#ccc" }}> No messages... </p>
				) : (
					messages.map(({ name, body }, i) => (
						<p key={i}>
							<Tag color="blue">{name}</Tag> {body}
						</p>
					))
				)}
			</div>

			<Input
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				style={{ marginBottom: 10 }}
			></Input>
			<Input.Search
				value={body}
				onChange={(e) => setBody(e.target.value)}
				enterButton="Send"
				placeholder="Type a message here..."
				onSearch={(msg) => {
					sendMessage({ name: username, body: msg });
					// setBody("");
				}}
			></Input.Search>
		</div>
	);
}

export default App;
