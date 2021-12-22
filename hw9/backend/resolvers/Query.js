import { makeName } from "./utils";
const Query = {
	async chatBox(parent, { name1, name2 }, { db }, info) {
		const name = makeName(name1, name2);
		return db.ChatBoxModel.findOne({ name: name });
	},
	async messages(parent, args, { db }, info) {
		return db.MessageModel.find();
	},
	async users(parent, args, { db }, info) {
		if (!args.username) return db.UserModel.find();
		else {
			return db.UserModel.findOne({ name: args.username });
		}
	},
};

export default Query;
