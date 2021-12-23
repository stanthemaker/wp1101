//import './App.css'
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import { Button, Input, Tabs } from "antd";
import styled from "styled-components";
import Title from "../Components/Title";
import ChatBox from "../Components/ChatBox";
import ChatModal from "../Components/ChatModal";
import useChatbox from "../Hooks/useChatbox";

const Wrapper = styled(Tabs)`
	width:100%;
	height:300px;
	background: #eeeeee52;
	border-radius :10px;
	margin:20px;
	padding 20px;
	display:flex;
`;

//note that funtctional components demand (props)
const ChatRoom = ({ me, displayStatus }) => {
	const [messageInput, setMessageInput] = useState("");
	const [activeKey, setActiveKey] = useState("");
	const { chatBoxes, createChatBox, removeChatBox } = useChatbox();
	const [modalVisible, setModalVisible] = useState(false);

	const addChatBox = () => {
		setModalVisible(true);
	};

	return (
		<>
			<Title>
				<h1>{me}'s Chat Room</h1>
				<Button type="primary" danger>
					Clear
				</Button>
			</Title>
			<>
				<Wrapper
					tabBarStyle={{ height: "360px" }}
					type="editable-card"
					activeKey={activeKey}
					onChange={(key) => {
						setactiveKey(key);
					}}
					onEdit={(targetKey, action) => {
						if (action === "add") addChatBox;
						else if (action === "remove") {
							setactiveKey(removeChatBox(targetKey, activeKey));
						}
					}}
				>
					{chatBoxes.map((friend) => {
						<Tabs.TabPane tab={friend} closable={true} key={friend}>
							<ChatBox me={me} friend={friend} key={key} />
						</Tabs.TabPane>;
					})}
				</Wrapper>
				<ChatModal
					visible={modalVisible}
					onCreate={async ({ name }) => {
						await startChat({
							variables: {
								name1: me,
								name2: name,
							},
						});

						setActiveKey(createChatBox(name));
						setModalVisible(false);
					}}
					onChange={() => {
						setModalVisible(false);
					}}
				/>
			</>
			<Input.Search
				value={messageInput}
				onChange={(e) => setMessageInput(e.target.value)}
				enterButton="send"
				placeholder="Enter message here..."
				onSearch={(msg) => {
					if (!msg) {
						displayStatus({
							type: "error",
							msg: "Please enter message",
						});
						return;
					}
					sendMessage({ name: me, body: msg });
					setMessageInput("");
				}}
			/>
		</>
	);
};

export default ChatRoom;
