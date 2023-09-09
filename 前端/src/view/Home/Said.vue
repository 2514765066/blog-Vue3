<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__slideInLeft" appear>
		<main class="v-sb-c o-h shadow w-100" id="said">
			<i class="fa-regular fa-bell fs-18" />
			<!-- 内容 -->
			<section class="h as-s w-100" :style="`transform:translateY(-${index * 45}px);transition:${delay}`">
				<article class="v-c-c" v-for="(item, index) of allSays" :key="index">{{ item }}</article>
				<article class="v-c-c">{{ allSays[0] }}</article>
			</section>

			<i class="fa-solid fa-angles-right fs-20" v-media="480"/>
		</main>
	</transition>
</template>

<script setup>
	import { useSayStore } from "@/store/useSayStore";
	import { ref } from "vue";

	const sayStore = useSayStore();
	const allSays = sayStore.says;

	let index = ref(0);
	const delay = ref("1000ms");
	const timer = setInterval(() => {
		index.value++;
		delay.value = "1000ms";
		if (index.value - 1 == allSays.length) {
			index.value = 0;
			delay.value = "none";
		}
	}, 4000);
</script>

<style scoped lang="scss">
	main#said {
		height: 2.8125rem;
		padding: 0 1rem;
		color: var(--title-color);
		section {
			padding: 0 1rem;
			> article {
				color: var(--title-color);				
				white-space: nowrap;
				overflow: hidden;
				height: 45px;
			}
		}
		i:nth-child(1){
			color: var(--yellow);
		}
		i:nth-child(3) {
			animation: arrow 2s infinite;
			color: var(--l-blue);
		}

		@keyframes arrow {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0;
				transform: translateX(0.625rem);
			}
			100% {
				opacity: 1;
			}
		}
	}
	@media screen and (max-width: 480px) {
		main#said {
			section>article{
				justify-content: start !important;
			}
		}
	}
</style>
