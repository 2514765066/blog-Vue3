import { defineStore } from "pinia";
import pinia from "@/store";
import * as api from "@/api";
import { useMainStore } from "@/store/useMainStore";

const mainStore = useMainStore(pinia);

export const useTalkStore = defineStore("useTalkStore", {
	state: () => ({
		talks: [],
	}),
	actions: {
		async getData() {
			const { data } = await api.getData("/talks");
			this.talks = data;
		},
		//点赞
		toLike(id) {
			return this.talks.some(item => {
				if (item.id == id) {
					if (item.like.includes(mainStore.token.username)) {
						return false;
					} else {
						api.postData(`/talks/like/${id}`, mainStore.token);
						item.like.push(mainStore.token.username);
						return true;
					}
				}
			});
		},
		//添加评论
		toMsg(id, data) {
			return this.talks.some(item => {
				if (item.id == id) {				
					api.postData(`/talks/msg/${id}`, data);
					item.msg.push(data);
					return true;
				}
			});
		},
		//删除说说
		deleteData(id) {
			api.deleteData(`/talks/${id}`);
			const index = this.talks.findIndex(item => item.id == id);
			this.talks.splice(index, 1);
			return true;
		},
		//添加说说
		postData(data) {
			//缓存
			const cacheImg = data.img.map(item => window.URL.createObjectURL(item.file));
			//发送到服务端
			data.img = data.img.map(item => "/images/" + item.name);
			api.postData("/talks", data);
			//本地保存
			data.img = cacheImg;
			this.talks.push(data);
			return true;
		},		
	},
});
