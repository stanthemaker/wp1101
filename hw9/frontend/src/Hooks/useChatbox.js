import { useState } from "react";

const useChatBox = () => {
	const [chatBoxes, setChatBoxes] = useState([]);

	const createChatBox = (friend) => {
		if (chatBoxes.some((name) => name === friend))
			throw new Error(friend + "'s chat box has already opended");
		setChatBoxes([...chatBoxes, friend]);
		return friend;
	};

	const removeChatBox = (targetkey, activeKey) => {
		const index = chatBoxes.indexOf(activeKey);
		const newChatBoxes = chatBoxes.filter((name) => name !== targetkey);
		setChatBoxes(newChatBoxes);

		return activeKey
			? activeKey === targetkey
				? index === 0
					? ""
					: chatBoxes[index - 1]
				: activeKey
			: targetkey;
	};
};
export default useChatBox;
