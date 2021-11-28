import "./App.css";
import { Button, Input, Tag } from "antd";
import useChat from "./useChat";
import { useState } from "react";

function App() {
	const { status, messages, sendMessage } = useChat();
	const [username, setUsername] = useState("");
	const [body, setBody] = useState(""); // textBody

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
						<p className="App-message" key={i}>
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
