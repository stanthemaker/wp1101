import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatRoom from "../Containers/ChatRoom";
import SignIn from "../Containers/SignIn";
import useChat from "../Hooks/useChat";
import { message } from "antd";
const LOCALSTORAGE_KEY = "save-me";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 500px;
	margin: auto;
`;

function App() {
	const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
	const { messages, clearMessages, sendMessage } = useChat();
	const [me, setMe] = useState(savedMe || "");
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		if (signedIn) {
			localStorage.setItem(LOCALSTORAGE_KEY, me);
		}
	}, [signedIn, me]);

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
	return (
		<Wrapper>
			{!signedIn ? (
				<SignIn
					me={me}
					setMe={setMe}
					setSignedIn={setSignedIn}
					displayStatus={displayStatus}
				/>
			) : (
				<ChatRoom
					me={me}
					messages={messages}
					clearMessages={clearMessages}
					displayStatus={displayStatus}
					sendMessage={sendMessage}
				/>
			)}
		</Wrapper>
	);
}

export default App;
