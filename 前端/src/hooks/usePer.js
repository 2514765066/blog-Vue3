import { useMainStore } from "@/store/useMainStore";
import pinia from "@/store"

const mainStore = useMainStore(pinia);

export const per = per => {
	if (mainStore.permissions.includes(mainStore.token.username + ":" + per)) {
		return true;
	}
	return false;
};
