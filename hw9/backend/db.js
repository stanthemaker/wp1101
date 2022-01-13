import mongoose from "mongoose";
const { Schema } = mongoose;
const ChatBoxSchema = new Schema({
	name: { type: String, required: true },
	messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});
const MessageSchema = new Schema({
	sender: { type: mongoose.Types.ObjectId, ref: "User" },
	body: { type: String, required: true },
});
const UserSchema = new Schema({
	name: { type: String, required: true },
});
const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

export { UserModel, MessageModel, ChatBoxModel };
