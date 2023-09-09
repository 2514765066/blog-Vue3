import { defineStore } from "pinia";
import * as api from "@/api";
import { useMainStore } from "@/store/useMainStore";
import pinia from "@/store";

const mainStore = useMainStore(pinia);

export const useArticleStore = defineStore("useArticleStore", {
	state: () => ({
		articles: [],
	}),
	actions: {
		async getData() {
			const { data } = await api.getData("/articles");
			this.articles = data;
		},
		//添加文章
		postData(data) {
			//换背景图
			if (typeof data.bg === "object") {
				const cacheImg = window.URL.createObjectURL(data.bg);
				data.bg = "/images/" + data.id + ".png";
				api.postData("/articles", data);
				data.bg = cacheImg;
			}
			//没有背景图
			if (data.bg == "") {
				data.bg = "/src/assets/edit.png";
				api.postData("/articles", data);
			}
			this.articles.push(data);
			return true;
		},
		//更新文章
		putData(data) {
			//换背景图
			const index = this.articles.findIndex(item => item.id == data.id);
			if (typeof data.bg === "object") {
				const cacheImg = window.URL.createObjectURL(data.bg);
				data.bg = "/images/" + data.id + ".png";
				api.putData("/articles", data);
				data.bg = cacheImg;
				this.articles.splice(index, 1, data);
				return true;
			}
			api.putData("/articles", data);
			this.articles.splice(index, 1, data);
			return true;
		},
		//删除文章
		deleteData(id) {
			api.deleteData(`/articles/${id}`);
			const index = this.articles.findIndex(item => item.id == id);
			this.articles.splice(index, 1);
			return true;
		},
		//点赞
		toLike(id) {
			return this.articles.some(item => {
				if (item.id == id) {
					if (item.like.includes(mainStore.token.username)) {
						return false;
					} else {
						api.postData(`/articles/like/${id}`, mainStore.token);
						item.like.push(mainStore.token.username);
						return true;
					}
				}
			});
		},
		//添加评论
		toMsg(id, data) {
			return this.articles.some(item => {
				if (item.id == id) {
					api.postData(`/articles/msg/${id}`, data);
					item.msg.push(data);
					return true;
				}
			});
		},
	},
});
