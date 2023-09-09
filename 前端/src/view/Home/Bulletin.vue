<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<main id="bulletin" class="shadow">
			<section class="fs-20 mb-2">
				<i class="fa-solid fa-bullhorn fa-shake mr-2" />
				<span>公告</span>
			</section>
			<section>{{ abouts.bulletin }}</section>
		</main>
	</transition>
</template>

<script setup>
	import { useAboutStore } from "@/store/useAboutStore";

	const aboutStore = useAboutStore();

	const abouts = aboutStore.abouts;
	
</script>

<style scoped lang="scss">
	main#bulletin {
		padding: 1rem;
		> section {
			line-height: 25px;
			color: var(--title-color);
			i {
				color: var(--yellow);
			}
		}
	}
</style>
