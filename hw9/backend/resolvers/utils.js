// return the found user (can be null)
const makeName = (name1, name2) => {
	return [name1, name2].sort().join("_");
};
const checkUser = (db, name, errFunc) => {
	if (!name) throw new Error("Missing user name for " + errFunc);
	return db.UserModel.findOne({ name });
};
const checkChatBox = (db, chatBoxName, errFunc) => {
	if (!chatBoxName) throw new Error("Missing chatBoxname for " + errFunc);
	return db.ChatBoxModel.findOne({ name: chatBoxName });
};
const checkMessage = async (db, from, to, message, errFunc) => {
	const checkBoxName = makeName(from, to);
	return {
		ChatBox: await checkChatBox(db, checkBoxName, errFunc),
		sender: await checkUser(db, from, errFunc),
		to: await checkUser(db, to, errFunc),
	};
};
const newMessage = (db, sender, body) => {
	return new db.MessageModel({ sender, body }).save();
};
// make sure calling checkUser beforehand
const newUser = (db, name) => {
	return new db.UserModel({ name }).save();
};
const newChatBox = (db, chatBoxName) => {
	return new db.ChatBoxModel({ name: chatBoxName }).save();
};

// makeName, checkChatBox, checkMessage, newMessage, newChatBox
export {
	makeName,
	checkChatBox,
	checkUser,
	checkMessage,
	newMessage,
	newChatBox,
	newUser,
};
