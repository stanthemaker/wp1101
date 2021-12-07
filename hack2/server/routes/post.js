import express from "express";
import Post from "../models/post";
import moment from "moment";

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async (req, res) => {
	Post.find({})
		.sort({ timestamp: -1 })
		.exec((err, r) => {
			if (err) {
				console.log("err:", err);
				res.status(403).send({ message: "error", data: null });
			} else {
				if (!r.length) {
					res.status(403).send({ message: "error", data: null });
				}
				res.status(200).send({ message: "success", data: r });
			}
		});
});
// const initData = (ws) => {
// 	Message.find()
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
// TODO 3-(1): create the 2nd API (/api/postDetail)

// TODO 4-(1): create the 3rd API (/api/newPost)

// TODO 5-(1): create the 4th API (/api/post)

export default router;
