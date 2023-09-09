import express from "express";
import bodyParser from "body-parser";
import path from "path";
import talkRoute from "./routes/talk.mjs";
import articleRoute from "./routes/article.mjs";
import imageRoute from "./routes/image.mjs";
import loginRoute from "./routes/login.mjs";
import aboutRoute from "./routes/about.mjs";
import messageRoute from "./routes/message.mjs";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//静态资源
app.use(express.static(path.resolve("./public")));

app.use("/api", loginRoute);
app.use("/api/talks", talkRoute);
app.use("/api/articles", articleRoute);
app.use("/api/images", imageRoute);
app.use("/api/abouts", aboutRoute);
app.use("/api/messages", messageRoute);

//请求
app.get("/api/:db", (req, res) => {
	res.sendFile(path.resolve(`./database/${req.params.db}.json`));
});

app.listen(8080, () => {
	console.log("服务端启动成功");
});
