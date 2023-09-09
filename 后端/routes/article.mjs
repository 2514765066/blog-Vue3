import express from "express";
import fs from "fs";

const router = express.Router();

const filePath = "./database/articles.json";

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

//添加文章
router.post("/", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		var obj = JSON.parse(data);

		obj.push(req.body);
		var json = JSON.stringify(obj);

		fs.writeFile(filePath, json, () => {
			res.send(true);
		});
	});
});

//替换文章
router.put("/", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		var obj = JSON.parse(data);

		const index = obj.findIndex(item => item.id == req.body.id);

		obj.splice(index, 1, req.body);

		var json = JSON.stringify(obj);

		fs.writeFile(filePath, json, () => {
			res.send(json);
		});
	});
});

//删除文章
router.delete("/:id", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		let obj = JSON.parse(data);

		const index = obj.findIndex(item => {
			if (item.id == req.params.id) {
				fs.unlink(`./public${item.bg}`, () => {});
				return item;
			}
		});
		obj.splice(index, 1);

		let json = JSON.stringify(obj);

		fs.writeFile(filePath, json, () => {
			res.send(true);
		});
	});
});
export default router;
