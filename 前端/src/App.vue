<template>
	<main :class="mainStore.theme">
		<Dialog />
		<Tip />
		<ZoomImg />
		<PcNav v-media="480" />
		<ModNav />
		<LeftNav />
		<router-view></router-view>
	</main>
</template>

<script setup>
	import ModNav from "@/components/ModNav.vue";
	import Dialog from "@/components/Dialog.vue";
	import ZoomImg from "@/components/ZoomImg.vue";
	import Tip from "@/components/Tip.vue";
	import PcNav from "@/components/PcNav.vue";
	import LeftNav from "@/components/LeftNav.vue";
	import { useMainStore } from "@/store/useMainStore";
	import { useSayStore } from "@/store/useSayStore";
	import { useAboutStore } from "@/store/useAboutStore";
	import { useArticleStore } from "@/store/useArticleStore";
	import { useTalkStore } from "@/store/useTalkStore";
	import { useMessageStore } from "@/store/useMessageStore";

	const mainStore = useMainStore();
	const sayStore = useSayStore();
	const aboutStore = useAboutStore();
	const articleStore = useArticleStore();
	const talkStore = useTalkStore();
	const messageStore = useMessageStore();

	mainStore.getPer();
	mainStore.tokenLogin();
	sayStore.getData();
	aboutStore.getData();
	articleStore.getData();
	talkStore.getData();
	messageStore.getData();
</script>

<style lang="scss">
	.light {
		--bg: #fff;
		--bg-l: #eee;
		--border: #ccc;
		--title-color: #333;
		--subtitle-color: #666;
		--text-color: #999;
		--shadow: rgba(0, 0, 0, 0.1);
		--hovershadow: rgba(0, 0, 0, 0.2);
		--tip-bg: rgba(0, 0, 0, 0.6);
		--tip-color: #fff;
		--tip-i: #fff;
		--waves1: rgba(253, 253, 253);
		--waves2: rgba(253, 253, 253, 0.3);
		--waves3: rgba(253, 253, 253, 0.5);
		--waves4: rgba(253, 253, 253, 0.7);
		--permissions-bg: rgb(117, 117, 217, 0.9);
		--permissions-color: #fff;
		--articletip: #f7f7f7;
	}
	.dark {
		--bg: #222;
		--bg-l: #21252b;
		--border: #444;
		--title-color: #aaa;
		--subtitle-color: #aaa;
		--text-color: #aaa;
		--shadow: rgba(0, 0, 0, 0.6);
		--hovershadow: #000;
		--tip-bg: #fff;
		--tip-color: #333;
		--tip-i: rgb(49, 203, 49);
		--waves1: #222;
		--waves2: rgba(34, 34, 34, 0.3);
		--waves3: rgba(34, 34, 34, 0.5);
		--waves4: rgba(34, 34, 34, 0.7);
		--permissions-bg: rgba(0, 0, 0, 0.9);
		--permissions-color: rgba(255, 255, 255, 0.6);
		--articletip: #363636;
	}
	.shadow {
		border-radius: 0.5rem;
		box-shadow: 0 0 10px var(--shadow);
		transition: 0.5s box-shadow;
		&:hover {
			box-shadow: 0 0 20px var(--hovershadow);
		}
	}
	.b-shadow {
		border-radius: 0.5rem;
		box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--shadow);
		transition: 0.5s box-shadow;
		&:hover {
			box-shadow: 0 0 20px var(--hovershadow);
		}
	}
	@font-face {
		font-family: "water";
		src: url("@/assets/WenDaoShuiYunZhuan-2.ttf");
	}
	@font-face {
		font-family: "pen";
		src: url("@/assets/FrederickatheGreat-Regular.ttf");
	}
	.dragmoving {
		border: 5px dashed #aaa !important;
		background-color: var(--bg) !important;
		color: var(--bg) !important;
		> * {
			background-color: var(--bg) !important;
			color: var(--bg) !important;
			user-select: none;
		}
	}
	body {		
		overflow-x: hidden;
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #aaa;
			border-radius: 3px;
		}
	}
</style>
