import uuidv4 from "uuid/v4";
import {
	makeName,
	newUser,
	newChatBox,
	newMessage,
	checkMessage,
	checkUser,
	checkChatBox,
} from "./utils";

const Mutation = {
	async createMessage(parent, { from, to, message }, { db, pubsub }, info) {
		const { chatBox, sender } = await checkMessage(
			db,
			from,
			to,
			message,
			"createMessage"
		);
		if (!chatBox) throw new Error("ChatBox not found for createMessage");
		if (!sender) throw new Error("User not found", from);
		const chatBoxName = makeName(from, to);
		const newMsg = await newMessage(db, sender, message);
		chatBox.messages.push(newMsg);
		await chatBox.save();

		pubsub.publish(`message ${chatBoxName}`, {
			message: { mutation: "CREATED", message: newMsg },
		});
		// pubsub.publish(`message ${chatBoxName}`, {
		// 	message: { mutation: "CREATED", data: message },
		// });
		return newMsg;
	},
	async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
		//{name1, name2} friom args
		if (!name1 || !name2)
			throw new Error("Missing chatBox name for CreateChatBox");
		if (!(await checkUser(db, name1, "createChatBox"))) {
			console.log("User does not exist for CreateChatBox: " + name1);
			await newUser(db, name1);
		}
		const chatBoxName = makeName(name1, name2);
		let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
		if (!chatBox) chatBox = await newChatBox(db, chatBoxName);

		return chatBox;
	},
	async createUser(parent, { username }, { db }, info) {
		const existed = await db.UserModel.findOne({ name: username });
		if (existed) {
			throw new Error("username existed");
		} else {
			return newUser(db, username);
		}
	},
};

export default Mutation;
