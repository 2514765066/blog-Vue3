import { defineStore } from "pinia";
import * as api from "@/api";

export const useAboutStore = defineStore("useAboutStore", {
	state: () => ({
		abouts: {},
	}),
	actions: {
		async getData() {
			const { data } = await api.getData("/abouts");
			this.abouts = data;
		},
		putData(data) {
			api.putData("/abouts", data);
			this.abouts = data;
			return true;
		},
	},
});
