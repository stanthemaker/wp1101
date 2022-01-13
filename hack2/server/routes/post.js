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
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", async (req, res) => {
	const requestPid = req.query.pid;
	try {
		const post = await Post.findOne({ postId: requestPid });
		if (!post) {
			res.status(403).send({ message: "error", post: null });
			return;
		}
		res.status(200).send({ message: "success", post: post });
	} catch (e) {
		res.status(403).send({ message: "error", post: null });
	}
});

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post("/newPost", async (req, res) => {
	const data = req.body;
	const newPost = new Post(data);
	try {
		newPost.save(data);
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(403).send({ message: "error", post: null });
	}
});
// TODO 5-(1): create the 4th API (/api/post)
router.delete("/post", async (req, res) => {
	const requestPid = req.query.pid;
	console.log("requestPid", requestPid);
	try {
		await Post.deleteOne({ postId: requestPid });
		res.status(200).send({ message: "success" });
	} catch (e) {
		res.status(403).send({ message: "error", post: null });
	}
});

export default router;
