<template>
	<header class="p-r v-c-c h-70v">
		<img :src="bg" class="c-img w-100 h-70v p-f" />

		<section class="p-f h-c-c">
			<p class="fw-b t-c">{{ props.title }}</p>
			<div class="t-c">
				<slot></slot>
			</div>
		</section>

		<Waves />
	</header>
</template>

<script setup>
	import Waves from "@/components/Waves.vue";
	import { computed } from "vue";
	import { useMainStore } from "@/store/useMainStore";
	import { useRoute } from "vue-router";
	import bgl from "@/assets/bg-l.png";
	import bgd from "@/assets/bg-d.png";
	import bge from "@/assets/edit.png";

	const route = useRoute();
	const mainStore = useMainStore();

	let bg = computed(() => {
		if (props.url) {
			return props.url || bge;
		} else {
			return mainStore.theme == "light" ? bgl : bgd;
		}
	});
	const props = defineProps({
		title: String,
		url: String,
	});
</script>

<style scoped lang="scss">
	header {
		z-index: -5;
		> * {
			user-select: none;
		}
		> section {
			color: #fff;
			text-shadow: 0 0 5px #444;
			p {
				font-size: 6.25rem;
				letter-spacing: 10px;
				font-family: "water";
			}
			> div {
				font-size: 14px;
			}
		}
	}
</style>
