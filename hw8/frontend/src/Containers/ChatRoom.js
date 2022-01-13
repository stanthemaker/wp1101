//import './App.css'
import { Input, Button, Tag } from "antd";
import { useState } from "react";
import Title from "../Components/Title";
import Message from "../Components/Message";
//note that funtctional components demand (props)
const ChatRoom = ({
	me,
	messages,
	clearMessages,
	displayStatus,
	sendMessage,
}) => {
	const [body, setBody] = useState(""); // textBody
	return (
		<>
			<Title>
				<h1>{me}'s Chat Room</h1>
				<Button type="primary" danger onClick={clearMessages}>
					Clear
				</Button>
			</Title>
			<Message>
				{messages.map(({ name, body }, i) => (
					<p className="App-message" key={i}>
						<Tag color="blue">{name}</Tag> {body}
					</p>
				))}
			</Message>
			<Input.Search
				value={body}
				// ref={bodyRef}
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
					sendMessage({ name: me, body: msg });
					setBody("");
				}}
			></Input.Search>
		</>
	);
};

export default ChatRoom;
