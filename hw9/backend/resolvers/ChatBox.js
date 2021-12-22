const ChatBox = {
	messages(parent, args, { db }, info) {
		//parent == chatBox ,
		return Promise.all(
			//wait for all executions done
			parent.messages.map((mId) => db.MessageModel.findById(mId))
		);
	},
};
export default ChatBox;
