import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoDB from "./mongo";
import * as db from "./db"; // db.UserModel
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
// import User from "./resolvers/User";
import ChatBox from "./resolvers/ChatBox";
import Message from "./resolvers/Message";

const pubsub = new PubSub();

const server = new GraphQLServer({
	typeDefs: "./schema.graphql",
	resolvers: {
		Query,
		Mutation,
		Subscription,
		Message,
		ChatBox,
	},
	context: {
		db,
		pubsub,
	},
});
mongoDB.once("open", () => {
	server.start({ port: process.env.PORT | 5000 }, () => {
		console.log(`The server is up on port ${process.env.PORT | 5000}!`);
	});
});
