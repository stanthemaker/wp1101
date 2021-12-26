//import './App.css'
import { useState, useEffect, useRef } from "react";
import { from, useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import { Button, Input, Tabs } from "antd";
import styled from "styled-components";
import Title from "../Components/Title";
import ChatBox from "../Containers/ChatBox";
import ChatModal from "../Containers/ChatModal";
import useChatbox from "../Hooks/useChatbox";
import Modal from "antd/lib/modal/Modal";

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

	const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
	const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
	const addChatBox = () => {
		setModalVisible(true);
	};
	const ModalRef = useRef();

	const handleCreate = async () => {
		const name = ModalRef.current.state.value;
		if (name === "" || name === undefined) {
			displayStatus({
				type: "error",
				msg: "Please enter a valid username.",
			});
			return;
		}
		ModalRef.current.state.value = "";
		if (name.trim() === "" || !name) {
			displayStatus({
				type: "error",
				msg: "Please enter a valid username.",
			});
			return;
		}
		if (chatBoxes.includes(name.trim())) {
			displayStatus({
				type: "error",
				msg: "You have a chatbox already.",
			});
			return;
		}
		await startChat({
			variables: {
				name1: me,
				name2: name,
			},
		});

		setActiveKey(createChatBox(name));
		setModalVisible(false);
	};

	//for debug
	useEffect(() => {
		console.log("activeKey changed to:", activeKey);
	}, [activeKey]);
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
					tabBarStyle={{ height: "36px" }}
					type="editable-card"
					activeKey={activeKey}
					onChange={(key) => {
						setActiveKey(key);
					}}
					onEdit={(targetKey, action) => {
						if (action === "add") addChatBox();
						else if (action === "remove") {
							setActiveKey(removeChatBox(targetKey, activeKey));
						}
					}}
				>
					{chatBoxes.map((friend) => {
						return (
							<Tabs.TabPane tab={friend} closable={true} key={friend}>
								<ChatBox me={me} friend={friend} key={friend} />
							</Tabs.TabPane>
						);
					})}
				</Wrapper>
				<ChatModal
					visible={modalVisible}
					onCreate={handleCreate}
					onCancel={() => {
						setModalVisible(false);
					}}
					inputRef={ModalRef}
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
					sendMessage({
						variables: {
							from: me,
							to: activeKey,
							message: msg,
						},
					});
					setMessageInput("");
				}}
			/>
		</>
	);
};

export default ChatRoom;
