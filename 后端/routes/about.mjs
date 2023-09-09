import express from "express";
import fs from "fs";

const router = express.Router();

const filePath = "./database/abouts.json";

//修改
router.put("/", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		let about = JSON.parse(data);

		about = req.body;

		fs.writeFile(filePath, JSON.stringify(about), () => {
			res.send(true);
		});
	});
});

export default router;
