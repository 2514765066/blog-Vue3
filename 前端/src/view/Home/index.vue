<template>
	<Header />
	<main class="v-c-n" id="home">
		<section class="h-100">
			<Said />
			<Banner />
			<Item v-for="(item, index) of articles.slice(0, 4).reverse()" :key="item.id" :info="{ ...item, isReverse: index % 2 }" />
		</section>

		<section class="h-100" v-media="480">
			<Mine />
			<Bulletin />
			<Details />
		</section>
	</main>
	<Footer />
</template>

<script setup>
	import { useRouter } from "vue-router";
	import Header from "./Header.vue";
	import Footer from "@/components/Footer.vue";
	import Said from "./Said.vue";
	import Details from "./Details.vue";
	import Item from "./Item.vue";
	import Mine from "@/components/Mine.vue";
	import Bulletin from "./Bulletin.vue";
	import Banner from "./Banner.vue";
	import { useArticleStore } from "@/store/useArticleStore";

	const articleStore = useArticleStore();
	const articles = articleStore.articles;
</script>

<style scoped lang="scss">
	main#home {
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			padding: 0 0.625rem;
			> * {
				margin-bottom: 1.25rem;
			}
		}
		section:nth-child(1) {
			width: calc(72.5rem - 18.75rem);
		}
		section:nth-child(2) {
			width: 18rem;
		}
	}
	@media screen and (max-width: 480px) {
		main#home {
			padding: 0 .625rem;
			section:nth-child(1) {
				padding: 0 !important;
				width: 100% !important;
			}
		}
	}
</style>
