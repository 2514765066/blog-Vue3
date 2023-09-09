<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<main id="comment" class="shadow p-1r">
			<section class="fs-20 mb-2">
				<i class="fa-solid fa-chart-column mr-2" />
				<span>博客详情</span>
			</section>
			<section>
				<article class="v-sb-n mt-2 mb-2">
					<span>运行时长</span>
					<span>{{ runTime }}</span>
				</article>
				<article class="v-sb-n mt-2 mb-2">
					<span>文章数目</span>
					<span>{{ articles.length }}</span>
				</article>
				<article class="v-sb-n mt-2 mb-2">
					<span>留言数量</span>
					<span>{{ messages.length }}</span>
				</article>
				<article class="v-sb-n mt-2 mb-2">
					<span>说说数量</span>
					<span>{{ talks.length }}</span>
				</article>
			</section>
		</main>
	</transition>
</template>

<script setup>
	import { useArticleStore } from "@/store/useArticleStore";
	import { useMessageStore } from "@/store/useMessageStore";
	import { useTalkStore } from "@/store/useTalkStore";
	import { onMounted, onUnmounted, ref } from "vue";
	import { getTimeInterval } from "@/hooks/useTime";

	const articleStore = useArticleStore();
	const messageStore = useMessageStore();
	const talkStore = useTalkStore();

	const articles = articleStore.articles;
	const messages = messageStore.messages;
	const talks = talkStore.talks;
	const runTime = ref("");
	let timer = setInterval(() => {
		runTime.value = getTimeInterval(2023, 8, 7, 8, 0, 0);
	}, 1000);

	onUnmounted(() => {
		clearInterval(timer);
	});
</script>

<style scoped lang="scss">
	main#comment {
		color: var(--title-color);
		> section:first-child i {
			color: var(--l-green);
		}
		> section:nth-child(2) {
			> article > span:nth-child(2) {
				color: var(--text-color);
			}
		}
	}
</style>
