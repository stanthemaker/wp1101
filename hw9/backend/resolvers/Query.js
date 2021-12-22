import { makeName } from "./utils";
const Query = {
	async chatBox(parent, { name1, name2 }, { db }, info) {
		const name = makeName(name1, name2);
		return db.ChatBoxModel.findOne({ name });
	},
	async message(parent, { sender }, { db }, info) {
		return db.MessageModel.find();
	},
};

export default Query;
