import { defineStore } from "pinia";
import * as api from "@/api";

export const useMainStore = defineStore("useMainStore", {
	state: () => ({
		theme: localStorage.getItem("theme") || "light",
		token: {
			name: "游客",
			username: "visitor",
		},
		permissions: [],
	}),
	actions: {
		//获取权限组
		async getPer() {
			let { data } = await api.getData("/permissions");
			this.permissions = data;
		},
		//自动登录
		tokenLogin() {
			const t = localStorage.getItem("token");
			if (!t) return;
			api.postData("/login", JSON.parse(t)).then(({ data }) => {
				if (data.status) {
					this.token = data.token;
				}
			});
		},
		//改变主题
		changeTheme() {
			if (this.theme == "light") {
				this.theme = "dark";
			} else {
				this.theme = "light";
			}
			localStorage.setItem("theme", this.theme);
		},
		//添加图片
		postImage(data) {
			api.postData("/images", data);
		},
		//登录
		async toLogin(obj) {
			const { data } = await api.postData("/login", obj);
			if (data.status) {
				this.token = data.token;
				//本地存储一个key，刷新页面不用登陆
				localStorage.setItem(
					"token",
					JSON.stringify({
						username: data.token.username,
						token_key: data.token.token_key,
					})
				);
			}
			return data.status;
		},
		//注册
		async toReg(obj) {
			const { data } = await api.postData("/register", obj);
			return data;
		},
	},
});
