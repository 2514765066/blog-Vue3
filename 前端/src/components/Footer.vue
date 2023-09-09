<template>
	<footer ref="footer" class="v-n-e o-h w-100" key="fish"></footer>
</template>

<script setup>
	import { onMounted, ref } from "vue";
	import Draw from "@/assets/renderer";

	const footer = ref();

	onMounted(() => {
		if (screen.width > 480) {
			new Draw({
				el: footer.value,
				bg: "#3c6fcd",
			});
		}
	});
</script>

<style scoped lang="scss">
	footer {
		height: 12.5rem;
		background-color: var(--bg);
	}
	@media screen and (max-width: 480px) {
		footer {
			animation: gradient 10s ease infinite;
			background: linear-gradient(-45deg, #ec8c69, #e9546b, #38a1db, #23d5ab);
			background-size: 300% 300%;
			height: 6rem;
		}
		@keyframes gradient {
			0% {
				background-position: 0 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0 50%;
			}
		}
	}
</style>
