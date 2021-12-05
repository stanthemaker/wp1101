// import http, express, doting, mongoose, WebSocket... etc
const http = require("http");
const WebSocket = require("ws");
// const bodyParser = require("body-parser");
const express = require("express");
// const cors = require("cors");
const { sendData, sendStatus, initData } = require("./wssConnect");
const db = require("./mongo.js");
const Message = require("./models/messages.js");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 4000;
const broadcastMessage = (data, status) => {
	wss.clients.forEach((client) => {
		sendData(data, client);
		sendStatus(status, client);
	});
};

db.once("open", () => {
	console.log("db on");
	wss.on("connection", (ws) => {
		console.log("wss connection");
		initData(ws);
		ws.onmessage = async (byteString) => {
			const { data } = byteString;
			const [task, payload] = JSON.parse(data);
			console.log("wss received task :", task, ",  playload :", payload);
			switch (task) {
				case "input":
					{
						const { name, body } = payload;
						const message = new Message({ name, body });
						try {
							await message.save();
						} catch (e) {
							throw new Error("Message DB save failed: " + e);
						}
						broadcastMessage(["output", [payload]], {
							type: "success",
							msg: "Message sent",
						});
					}
					break;
				case "clear": {
					Message.deleteMany({}, () => {
						broadcastMessage(["cleared", [payload]], {
							type: "info",
							msg: "Message cache cleared.",
						});
						// sendData(["cleared"], ws);
						// sendStatus({ type: "info", msg: "Message cache cleared." }, ws);
					});
					break;
				}
				default:
					break;
			}
		};
		ws.on("close", () => {
			console.log("client has disconnected");
		});
	});
	server.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
