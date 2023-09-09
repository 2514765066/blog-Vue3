<template>
	<Header title="说说" />

	<main class="v-c-n" id="talk">
		<section class="h shadow">
			<Item v-for="item of talks.slice(-viewCount).reverse()" :key="item.id" :info="item" />

			<!-- 查看更多 -->
			<aside class="m-5 v-c-c" v-if="isMore">
				<span class="click" @click="viewCount += 4">查看更多说说<i class="fa-solid fa-angles-down ml-1" /></span>
			</aside>
		</section>
	</main>
	<Footer/>
</template>

<script setup>
import Footer from "@/components/Footer.vue";
	import Header from "@/components/Header.vue";
	import Item from "./Item.vue";
	import { useTalkStore } from "@/store/useTalkStore";
	import { ref, computed } from "vue";

	const talkStore = useTalkStore();
	const talks = talkStore.talks;
	const viewCount = ref(4);
	const isMore = computed(() => viewCount.value < talks.length);
</script>

<style scoped lang="scss">
	main#talk {
		min-height: 18.75rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			> aside {
				color: var(--text-color);
			}
		}
	}
	@media screen and (max-width: 480px) {
		main#talk>section{
			padding: 0 .625rem !important;
		}
	}
</style>
