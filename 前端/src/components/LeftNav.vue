<template>
	<main class="p-f">
		<div v-media.r="480" @click="toModNav">
			<i class="fa-solid fa-bars fs-20 mr-3" />
			<span>导航</span>
		</div>

		<div @click="mainStore.changeTheme">
			<i class="fa-solid fs-20 mr-3" :class="themeStyle" />
			<span>主题: {{ themeTitle }}</span>
		</div>

		<div @click="toArticleEdit" v-if="isArticleEdit">
			<i class="fa-solid fa-pen-to-square fs-20 mr-3" />
			<span>进入编辑模式</span>
		</div>

		<div @click="toEdit" v-if="isEdit">
			<i class="fa-solid fa-plus fs-20 mr-3" />
			<span>发布{{ editTitle }}</span>
		</div>
	</main>
</template>

<script setup>
	import { $bus } from "@/hooks/useBus";
	import { per } from "@/hooks/usePer";
	import { useMainStore } from "@/store/useMainStore";
	import { computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	const mainStore = useMainStore();
	const route = useRoute();
	const router = useRouter();

	const themeTitle = computed(() => (mainStore.theme == "light" ? "亮色" : "暗色"));
	const themeStyle = computed(() => (mainStore.theme == "light" ? "fa-sun" : "fa-moon"));
	const isArticleEdit = computed(() => per("edit") && route.path == "/context");
	const isEdit = computed(() => per("edit") && (route.path == "/article" || route.path == "/talk"));
	const editTitle = computed(() => {
		if (route.path == "/talk") {
			return "说说";
		} else if (route.path == "/article") {
			return "文章";
		}
	});
	//进入发布页面
	function toEdit() {
		if (route.path == "/talk") {
			router.push({
				path: "/edit/talk",
			});
		} else if (route.path == "/article") {
			router.push({
				path: "/edit/article",
			});
		}
	}
	//进入文章编辑页面
	function toArticleEdit() {
		router.push({
			path: "/edit/article",
			query: {
				id: route.query.id,
			},
		});
	}
	//手机导航
	function toModNav() {
		$bus.emit("ModNavShow");
	}
</script>

<style scoped lang="scss">
	main {
		user-select: none;
		color: var(--permissions-color);
		background-color: var(--permissions-bg);
		left: 0;
		top: 3.75rem;
		width: 3.4375rem;
		padding: 0.9375rem 0;
		z-index: 10;
		border-top-right-radius: 1.25rem;
		border-bottom-right-radius: 1.25rem;
		transition: 0.5s;
		&:hover {
			width: 170px;
			> div > span {
				opacity: 1;
			}
		}
		> div {
			padding: 0.625rem 0.9375rem;
			overflow: hidden;
			display: flex;
			align-items: center;
			cursor: pointer;
			span {
				transition: 0.5s;
				white-space: nowrap;
				opacity: 0;
			}
		}
	}
	@media screen and (max-width: 480px) {
		main {
			top: 0;
			border-top-right-radius: 0;
		}
	}
</style>
