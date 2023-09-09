import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";

const router = express.Router();

const filePath = "./database/messages.json";

//添加留言
router.post("/", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);

		all.push({
			id: nanoid(),
			...req.body,
		});

		fs.writeFile(filePath, JSON.stringify(all), () => {
			res.send(true);
		});
	});
});

export default router;
