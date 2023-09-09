import { defineStore } from "pinia";
import * as api from "@/api";

export const useMessageStore = defineStore("useMessageStore", {
	state: () => ({
		messages: [],
	}),
	actions: {
		async getData() {
			const { data } = await api.getData("/messages");
			this.messages = data;
		},
		postData(data) {
			api.postData("/messages", data);
			this.messages.push(data);
			return true
		},
	},
});
