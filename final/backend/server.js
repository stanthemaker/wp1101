// import http, express, doting, mongoose, WebSocket... etc
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
// const { sendData, sendStatus, initData } = require("./wssConnect");
const db = require("./mongo.js");
const Stock = require("./models/stock.js");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 4000;
// const broadcastMessage = (data, status) => {
// 	wss.clients.forEach((client) => {
// 		sendData(data, client);
// 		sendStatus(status, client);
// 	});
// };

db.once("open", () => {
	console.log("db on");
	wss.on("connection", (ws) => {
		console.log("wss connected!");
	});
	server.listen(port, () => {
		console.log(`Server is up on port ${port}.`);
	});
});
