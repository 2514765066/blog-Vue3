import axios from "axios";

export const baseURL = "http://zhangmingyang.love:8080";
// export const baseURL = "http://localhost:5173";

const api = axios.create({
	baseURL: `${baseURL}/api`,
	timeout: 5000,
});

//初始化请求数据
export const getData = url =>
	api({
		url,
		method: "get",
	});

//添加数据
export const postData = (url, data) =>
	api({
		url,
		method: "post",
		data,
	});

//删除数据
export const deleteData = url => {
	api({
		url,
		method: "delete",
	});
};

//替换数据
export const putData = (url, data) =>
	api({
		url,
		method: "put",
		data,
	});
