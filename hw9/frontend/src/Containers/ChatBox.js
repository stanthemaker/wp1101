import Messages from "../Components/Messages";
import { useEffect, useRef } from "react";
import { Typography, Space } from "antd";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";
const { Paragraph } = Typography;
// const Messages = styled.div`
// 	height: calc(240px-36px);
// 	display: flex;
// 	flex-direction: column;
// 	overflow: auto;
// `;

const ChatBox = ({ me, friend, ...props }) => {
	const messageFooter = useRef(null);
	//unknown

	const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
		variables: { name1: me, name2: friend },
	});

	const scrollToBottom = () => {
		messageFooter.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		scrollToBottom();
	}, [data]);
	useEffect(() => {
		try {
			subscribeToMore({
				document: MESSAGE_SUBSCRIPTION,
				variables: {
					name1: me,
					name2: friend,
				},
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
					//this is refered to subscription.js
					const newMessage = subscriptionData.data.message.message;
					// console.log("new message received", newMessage);
					// console.log("prev = ", ...prev.chatBox.messages);

					return {
						//return to data at line 18
						...prev,
						chatBox: {
							...prev.chatBox,
							messages: [...prev.chatBox.messages, newMessage],
						},
					};
				},
			});
		} catch (e) {
			throw new Error("subscription error", e);
		}
	}, [subscribeToMore]);

	if (loading) return <p>loading</p>;
	// console.log("messages in chatBox", data.chatBox.messages);
	return (
		<Messages>
			{data.chatBox.messages.map(({ sender: { name }, body }, i) => {
				return me === name ? (
					<p className="App-message" key={i} align="right">
						<Space align="end">
							<Paragraph
								type="secondary"
								ellipsis={{ rows: 1000 }}
								style={{
									maxWidth: "200px",
									margin: "0",
									borderRadius: "5px",
									backgroundColor: "#bbbbbb",
									padding: "0 5px",
									textAlign: "left",
								}}
							>
								{body}
							</Paragraph>
							{name}
						</Space>
					</p>
				) : (
					<p className="App-message" key={i}>
						<Space align="end">
							{name}{" "}
							<Paragraph
								type="secondary"
								ellipsis={{ rows: 1000 }}
								style={{
									maxWidth: "200px",
									margin: "0",
									borderRadius: "5px",
									backgroundColor: "#0000ff66",
									color: "white",
									padding: "0 5px",
									textAlign: "left",
								}}
							>
								{body}
							</Paragraph>
						</Space>
					</p>
				);
			})}
			<div ref={messageFooter} style={{ height: "0px" }} />
		</Messages>
	);
};
export default ChatBox;
