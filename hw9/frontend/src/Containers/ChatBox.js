import Message from "../Components/Message";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";

const Messages = styled.div`
	height: calc(240px-36px);
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

const ChatBox = ({ me, friend, ...props }) => {
	const messageFooter = useRef(null);
	//unknown
	// console.log("me and friend from chatbox", me, friend);

	const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
		variables: { name1: me, name2: friend },
	});

	const scrollToBottom = () => {
		messageFooter.current?.scrollToBottom({ behavior: "smooth" });
	};
	useEffect(() => {
		console.log("what is data?", data);
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

					console.log(prev);

					return {
						...prev,
						chatbox: {
							...prev.chatbox,
							messages: [...prev.chatbox.messages, newMessage],
						},
					};
				},
			});
		} catch (e) {
			throw new Error("subscribe error", e);
		}
	}, [subscribeToMore]);

	if (loading) return <p>loading</p>;

	return (
		<Messages>
			{data.chatBox.messages.map(({ sender: { name }, body }, i) => (
				// <Message me={me} name={name} key={name + body + i} />
				<Message me={me} name={name} body={body} />
			))}
		</Messages>
	);
};
export default ChatBox;
