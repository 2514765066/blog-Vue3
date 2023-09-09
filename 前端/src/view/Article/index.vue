<template>
	<Header title="文章" />

	<main class="v-c-n" id="archive">
		<section class="h shadow">
			<!-- 标题 -->
			<article class="v-n-c pl-4 p-r">文章总览-{{ articles.length }}</article>

			<Para v-for="item of articles.slice(-viewCount).reverse()" :key="item.id" :info="item" />

			<More v-model="viewCount" :all="articles.length">查看更多文章</More>
		</section>
	</main>
	<Footer/>
</template>

<script setup>
	import More from "@/components/More.vue";
	import Footer from "@/components/Footer.vue";
	import Header from "@/components/Header.vue";
	import Para from "./Para.vue";
	import { useArticleStore } from "@/store/useArticleStore";
	import { computed, ref } from "vue";

	const articleStore = useArticleStore();

	const articles = articleStore.articles;
	const viewCount = ref(4);
</script>

<style scoped lang="scss">
	main#archive {
		min-height: 18.75rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			article {
				font-size: 1.5rem;
				height: 3.125rem;
				color: var(--title-color);
				&::before {
					content: "";
					position: absolute;
					width: 2px;
					height: 30px;
					background-color: var(--cyan);
					top: 20px;
					left: 0;
				}
				&::after {
					box-sizing: border-box;
					position: absolute;
					content: "";
					width: 18px;
					height: 18px;
					border: 5px solid var(--l-blue);
					background-color: var(--bg);
					border-radius: 50%;
					left: -8px;
					transition: 0.5s;
				}
				&:hover {
					&::after {
						border: 5px solid var(--oranges);
					}
				}
			}
			aside {
				color: var(--text-color);
			}
		}
	}
</style>
