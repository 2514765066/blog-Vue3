<template>
	<main id="zoomimg" class="p-f wh-100 h-c-c" v-if="isShow">
		<button @click="isShow = false" class="p-a p-1r">
			<i class="fa-solid fa-xmark click" />
		</button>
		<img :src="src" class="c-img w-100 h-80" />
	</main>
</template>

<script setup>
	import { onMounted, ref } from "vue";
	import { $bus } from "@/hooks/useBus";

	let src = ref("");
	let isShow = ref(false);

	onMounted(() => {
		$bus.on("zoomImgShow", data => {
			src.value = data.url;
			isShow.value = true;
		});
	});
</script>

<style scoped lang="scss">
	main#zoomimg {
		top: 0;
		left: 0;
		background-color: #222;
		z-index: 998;
		> button {
			top: 0;
			right: 0;
			font-size: 1.875rem;
			color: #fff;
		}
	}
</style>
