import { createRouter,createWebHashHistory } from "vue-router";
import pinia from "@/store";
import { useMainStore } from "@/store/useMainStore";
import { $bus } from "@/hooks/useBus";
import { per } from "@/hooks/usePer";
const mainStore = useMainStore(pinia);

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/home",
			component: () => import("@/view/Home/index.vue"),
		},
		{
			path: "/article",
			component: () => import("@/view/Article/index.vue"),
		},
		{
			path: "/talk",
			component: () => import("@/view/Talk/index.vue"),
		},
		{
			path: "/message",
			component: () => import("@/view/Message/index.vue"),
		},
		{
			path: "/about",
			component: () => import("@/view/About/index.vue"),
		},
		{
			path: "/user",
			component: () => import("@/view/User/index.vue"),
			beforeEnter(to, from, next) {
				if (mainStore.token.username != "visitor") {
					$bus.emit("dialogShow", {
						title: "提示",
						subtitle: "您已经登录过了,点击确定退出登录",
						func: () => {
							mainStore.token = {
								name: "游客",
								username: "visitor",
							};
							localStorage.removeItem("token");
							$bus.emit("tipShow", {
								title: "退出成功",
							});
							next();
						},
					});
				} else {
					next();
				}
			},
			children: [
				{
					path: "login",
					component: () => import("@/view/User/Login.vue"),
				},
				{
					path: "register",
					component: () => import("@/view/User/Register.vue"),
				},
			],
		},
		{
			path: "/context",
			component: () => import("@/view/Context/index.vue"),
		},
		{
			path: "/edit",
			beforeEnter(to, from, next) {
				if (per("edit")) {
					next();
				} else {
					next("/home");
				}
			},
			children: [
				{
					path: "talk",
					component: () => import("@/view/Edit/Talk.vue"),
				},
				{
					path: "article",
					component: () => import("@/view/Edit/Article.vue"),
				},
			],
		},
	],
});

export default router;
