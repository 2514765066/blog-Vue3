import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";

const router = express.Router();

const filePath = "./database/token.json";

//登录
router.post("/login", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const token = JSON.parse(data);
		const target = token.find(item => item.username === req.body.username);
		//不存在的时候
		if (!target) {
			res.send(false);
			return;
		}
		if (target.token_key === req.body.token_key || target.password === req.body.password) {
			if (!target.token_key) {
				target.token_key = nanoid();
				fs.writeFile(filePath, JSON.stringify(token), () => {});
			}
			res.send({
				status: true,
				token: {
					name: target.name,
					username: target.username,
					token_key: target.token_key,
				},
			});
			return;
		}
		res.send({
			status: false,
		});
	});
});

//注册
router.post("/register", (req, res) => {
	fs.readFile(filePath, (e, data) => {
		const all = JSON.parse(data);
		const isReg = all.find(item => item.username == req.body.username);
		if (isReg) {
			res.send(false);
			return;
		}
		all.push({
			username: req.body.username,
			password: req.body.password,
			token_key: "",
		});
		fs.writeFile(filePath, JSON.stringify(all), () => {});
		res.send(true);
	});
});
export default router;
