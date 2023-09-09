import multer from "multer";
import express from "express";

const router = express.Router();

//上传图片中间件
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

//上传图片
router.post("/", upload.array("images"), (req, res) => {
	res.send(true);
});

export default router;
