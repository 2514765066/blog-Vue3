<template>
	<Mask :isShow="isShow" :func="() => (isShow = false)"/>
	<transition name="animate__animated animate__bounce animate__faster 50ms" enter-active-class="animate__slideInRight" leave-active-class="animate__slideOutRight" appear>
		<section class="h-100v w-70v p-f" v-if="isShow">
			<Mine />
			<PcNav />
		</section>
	</transition>
</template>

<script setup>
	import Mask from "@/components/Mask.vue";
	import { $bus } from "@/hooks/useBus";
	import Mine from "@/components/Mine.vue";
	import PcNav from "@/components/PcNav.vue";
	import { onMounted, ref } from "vue";

	const isShow = ref(false);

	onMounted(() => {
		$bus.on("ModNavShow", () => {
			isShow.value = true;
		});
	});
</script>

<style scoped lang="scss">
	section {
		top: 0;
		right: 0;
		z-index: 997;
		background-color: var(--bg);
		overflow: auto;
	}
</style>
