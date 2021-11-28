// import http, express, doting, mongoose, WebSocket... etc
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv-defaults");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { sendData, sendStatus } = require("./wssConnect");
const db = require("./mongo.js");
const Message = require("./models/messages.js");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 4000;
db.once("open", () => {
	console.log("db on");
	wss.on("connection", (ws) => {
		ws.onmessage = async (byteString) => {
			const { data } = byteString;
			const [task, payload] = JSON.parse(data);
			console.log("data = " + data);
			console.log("payload = " + payload.name);
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
						sendData(["output", [payload]], ws);
					}
					break;
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
