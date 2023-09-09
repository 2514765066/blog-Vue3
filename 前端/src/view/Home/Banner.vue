<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__zoomIn" appear>
		<main id="banner" class="o-h p-r w-100">
			<!-- 轮播 -->
			<section class="wh-100 p-r" :style="`transform: translateX(-${index * 100}%)`">
				<article class="wh-100 v-c-c p-a click" v-for="item of articles.slice(0, 3)" :key="item.id" @click="toContext(item.id)">
					<img :src="`/images/${item.id}.png`" class="c-img wh-100" />
					<div class="p-a h-c-c">
						<p class="mb-1">{{ item.title }}</p>
						<span>发布时间:{{ item.time }}</span>
					</div>
				</article>
			</section>
			<!-- 箭头 -->
			<aside class="p-a h-100 v-n-c" @click="toLeft"><i class="fa-solid fa-chevron-left click"></i></aside>
			<aside class="p-a h-100 v-n-c" @click="toRight"><i class="fa-solid fa-chevron-right click"></i></aside>
			<!-- 点 -->
			<div class="p-a w-100 v-c-c">
				<span :class="dotStyle(0)"></span>
				<span :class="dotStyle(1)"></span>
				<span :class="dotStyle(2)"></span>
			</div>
		</main>
	</transition>
</template>

<script setup>
	import { ref } from "vue";
	import { useArticleStore } from "@/store/useArticleStore";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const articleStore = useArticleStore();
	const articles = articleStore.articles;

	let index = ref(0);
	let timer = setInterval(() => {
		toRight();
	}, 4000);
	const dotStyle = _index => (index.value == _index ? "select" : "");

	function toLeft() {
		if (index.value == 0) {
			index.value = 2;
			return;
		}
		index.value--;
	}
	function toRight() {
		if (index.value == 2) {
			index.value = 0;
			return;
		}
		index.value++;
	}
	function toContext(id) {
		router.push({
			path: "/context",
			query: {
				id,
			},
		});
	}
</script>

<style scoped lang="scss">
	main#banner {
		border-radius: 0.75rem;
		height: 14rem;
		section {
			color: #fff;
			transition: 0.5s;
			> article {
				p {
					font-size: 2rem;
				}
				span {
					font-size: 1rem;
				}
			}
			> article:nth-child(2) {
				transform: translateX(100%);
			}
			> article:nth-child(3) {
				transform: translateX(200%);
			}
		}
		> aside {
			top: 0;
			color: #fff;
			font-size: 1.875rem;
		}
		> aside:nth-child(2) {
			left: 1.875rem;
		}
		> aside:nth-child(3) {
			right: 1.875rem;
		}
		> div {
			bottom: 1.25rem;
			left: 0;
			> span {
				transition: 0.5s;
				width: 0.75rem;
				height: 0.75rem;
				background-color: var(--bg);
				border-radius: 0.75rem;
				margin: 0 0.3125rem;
			}
			.select {
				width: 1.875rem;
				background-color: var(--cyan);
			}
		}
	}
	@media screen and (max-width: 480px) {
		main#banner {
			> aside {
				font-size: 1.5625rem;
			}
			> aside:nth-child(2) {
				left: 0.625rem;
			}
			> aside:nth-child(3) {
				right: 0.625rem;
			}
		}
	}
</style>
