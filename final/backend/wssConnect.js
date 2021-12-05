// const Stock = require("./models/stock.js");
// const sendData = (data, ws) => {
// 	ws.send(JSON.stringify(data));
// };
// const sendStatus = (payload, ws) => {
// 	sendData(["status", payload], ws);
// };
// const initData = (ws) => {
// 	Stock.find()
// 		.sort({ created_at: -1 })
// 		.limit(100)
// 		.exec((err, res) => {
// 			if (err) throw err;
// 			// initialize app with existing messages
// 			// console.log("sending data:", res);
// 			sendData(["init", res], ws);
// 		});
// 	console.log(" initData finished");
// };

// export { initData, sendData, sendStatus };
