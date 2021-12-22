import "./App.css";
import { Button, Input, Tag, message } from "antd";
import { UserOutlined, AudioOutlined } from "@ant-design/icons";
import useChat from "./useChat";
import { useState, useEffect, useRef } from "react";
// let defaultUsername = "";
// const updateUsername = (newUsername) => {
// 	defaultUsername = newUsername;
// };
function App() {
	const [signIn, setSignIn] = useState(false);
	const {
		status,
		messages,
		defaultName,
		sendMessage,
		clearMessages,
		updateDefaultName,
	} = useChat();
	const [username, setUsername] = useState(""); //why....? useState("defaultName");
	const [body, setBody] = useState(""); // textBody
	const bodyRef = useRef(null);
	useEffect(() => {
		setUsername(defaultName);
	}, [defaultName]); //note that defaultName will only be changed once for each client

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
	const handleSignIn = (user) => {
		if (!user) {
			displayStatus({ type: "error", msg: "please input username" });
			return;
		}
		updateDefaultName(user);
		setSignIn(true);
	};
	useEffect(() => {
		displayStatus(status);
	}, [status]);
	const signInPage = (
		<div className="App">
			<div className="App-title">
				<h1>My Chatroom</h1>
			</div>
			{
				<Input.Search
					// value={!username ? defaultName : username}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					prefix={<UserOutlined />}
					enterButton="Sign in"
					placeholder="username:"
					onSearch={(username) => {
						handleSignIn(username);
					}}
				/>
			}
		</div>
	);
	const ChatRoom = (
		<div className="App">
			<div className="App-title">
				<h1>{username}'s Chat Room</h1>
				<Button type="primary" danger onClick={clearMessages}>
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
			<Input.Search
				value={body}
				ref={bodyRef}
				onChange={(e) => setBody(e.target.value)}
				enterButton="Send"
				placeholder="Type a message here..."
				onSearch={(msg) => {
					if (!msg) {
						displayStatus({
							type: "error",
							msg: "Please enter some messages.",
						});
						return;
					}
					sendMessage({ name: username, body: msg });
					setBody("");
				}}
			></Input.Search>
		</div>
	);
	return <>{signIn ? ChatRoom : signInPage}</>;
}

export default App;
