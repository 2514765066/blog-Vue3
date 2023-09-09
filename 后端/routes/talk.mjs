import express from "express";
import fs from "fs";

const router = express.Router();

const filePath = "./database/talks.json";

//点赞
router.post("/like/:id", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);

		all.find(item => {
			if (item.id == req.params.id) {
				item.like.push(req.body.username);
			}
		});

		fs.writeFile(filePath, JSON.stringify(all), () => {
			res.send(true);
		});
	});
});

//评论
router.post("/msg/:id", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);

		all.find(item => {
			if (item.id == req.params.id) {
				item.msg.push(req.body);
			}
		});

		fs.writeFile(filePath, JSON.stringify(all), () => {
			res.send(true);
		});
	});
});

//删除说说
router.delete("/:id", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);

		const index = all.findIndex(item => {
			if (item.id == req.params.id) {
				item.img.forEach(name => {
					fs.unlink(`./public${name}`, () => {});
				});
				return item;
			}
		});
		all.splice(index, 1);

		fs.writeFile(filePath, JSON.stringify(all), () => {
			res.send(true);
		});
	});
});

//添加说说
router.post("/", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);

		all.push(req.body);

		fs.writeFile(filePath, JSON.stringify(all), () => {
			res.send(true);
		});
	});
});

export default router;
