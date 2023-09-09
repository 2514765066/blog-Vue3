import { defineStore } from "pinia";
import * as api from "@/api";

export const useSayStore = defineStore("useSayStore", {
	state: () => ({
		says: [],
	}),
	actions: {
		async getData() {
			const { data } = await api.getData("/says");
			this.says = data;
		},
	},
});