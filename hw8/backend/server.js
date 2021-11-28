// import http, express, doting, mongoose, WebSocket... etc
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv-defaults");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mongoose.connection;
const port = process.env.PORT || 4000;
db.once("open", () => {
	wss.on("connection", (ws) => {
		ws.onmessage = async (byteString) => {
			const { data } = byteString;
			const [task, payload] = JSON.parse(data);
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
						sendData(["output", [payload]]);
					}
					break;
			}
			await dbMessage.save();
		};
	});
	server.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
