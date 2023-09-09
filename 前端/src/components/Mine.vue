<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<main id="mine" class="w-100 shadow h-n-c">
			<!-- 头像 -->
			<img :src="`${baseURL}/images/header.png`" class="c-img" />

			<!-- 名字 -->
			<p class="mt-3">{{ data.name }}</p>

			<!-- 名言 -->
			<div class="t-c mt-2 mb-2">{{ data.said }}</div>

			<!-- 博客信息 -->
			<section class="d-f mt-2 mb-2">
				<article class="h-n-c">
					<div class="fs-20 fw-b">{{ articles.length }}</div>
					<div class="fs-14">文章</div>
				</article>
				<article class="h-n-c">
					<div class="fs-20 fw-b">{{ talks.length }}</div>
					<div class="fs-14">说说</div>
				</article>
				<article class="h-n-c">
					<div class="fs-20 fw-b">4</div>
					<div class="fs-14">标签</div>
				</article>
			</section>
			<!-- 社交 -->
			<section class="mt-2">
				<i class="fa-brands fa-github fs-20"></i>
				<i class="fa-brands fa-qq fs-20"></i>
				<i class="fa-brands fa-weixin fs-20"></i>
				<i class="fa-brands fa-bilibili fs-20"></i>
			</section>
		</main>
	</transition>
</template>

<script setup>
	import { baseURL } from "@/api";
	import { useMainStore } from "@/store/useMainStore";
	import { useAboutStore } from "@/store/useAboutStore";
	import { useArticleStore } from "@/store/useArticleStore";
	import { useTalkStore } from "@/store/useTalkStore";
	import { computed, defineProps, reactive } from "vue";
	import { useRoute } from "vue-router";
	//仓库
	const mainStore = useMainStore();
	const aboutStore = useAboutStore();
	const articleStore = useArticleStore();
	const talkStore = useTalkStore();
	const route = useRoute();

	const token = mainStore.token;
	const abouts = aboutStore.abouts;
	const articles = articleStore.articles;
	const talks = talkStore.talks;

	const data = reactive(abouts);
</script>

<style scoped lang="scss">
	main#mine {
		min-width: 13.75rem;
		padding: 1rem calc(50% - 4.8438rem);
		&:hover {
			img {
				transform: rotate(360deg);
			}
		}
		img {
			width: 9.6875rem;
			height: 9.6875rem;
			border-radius: 50%;
			transition: 1s transform;
		}
		> i {
			font-size: 155px;
			color: var(--text-color);
		}
		> div {
			color: var(--text-color);
		}
		> p {
			color: var(--title-color);
		}
		> section > article {
			width: auto;
			padding: 0 0.6875rem;
			color: var(--subtitle-color);
			&:nth-child(2) {
				border-left: 1px solid var(--border);
				border-right: 1px solid var(--border);
			}
		}
		:last-child {
			i {
				margin: 0 0.5rem;
			}
			.fa-github {
				color: var(--title-color);
			}
			.fa-qq {
				color: var(--l-blue);
			}
			.fa-weixin {
				color: var(--green);
			}
			.fa-bilibili {
				color: var(--l-pink);
			}
		}
	}
	@media screen and (max-width: 480px) {
		#mine {
			box-shadow: none;
		}
	}
</style>
