<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__zoomIn" appear>
		<!-- 正向 -->
		<main class="d-f shadow o-h" id="normal" v-if="!info.isReverse" @click="toContext">
			<!-- 图片 -->
			<img :src="props.info.bg" class="c-img" />

			<section class="h pt-1r f-1">
				<article class="v-e-c">
					<span class="mr-3">
						<i class="fa-solid fa-calendar-days mr-1" />
						{{ props.info.time }}
					</span>
					<span>
						<i class="fa-solid fa-tags mr-1" />
						{{ props.info.tag }}
					</span>
				</article>
				<h3 class="mt-2 mb-2">{{ props.info.title }}</h3>
				<div class="h-100 o-h fs-14">## {{ props.info.subtitle }} ......</div>
				<a href="#" class="as-e">more...</a>
			</section>
		</main>
		<!-- 反向 -->
		<main class="d-f shadow o-h" id="reverse" v-else @click="toContext">
			<section class="h pt-1r f-1">
				<article class="v-n-c">
					<span class="mr-3"><i class="fa-solid fa-calendar-days mr-1" />{{ props.info.time }} </span>
					<span><i class="fa-solid fa-tags mr-1"></i>{{ props.info.tag }}</span>
				</article>
				<h3 class="mt-2 mb-2">{{ props.info.title }}</h3>
				<div class="h-100 o-h fs-14">## {{ props.info.subtitle }} ......</div>
				<a href="#">more...</a>
			</section>

			<img :src="props.info.bg" class="c-img" />
		</main>
	</transition>
</template>

<script setup>
	import { defineProps } from "vue";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const props = defineProps({
		info: Object,
	});

	function toContext() {
		router.push({
			path: "/context",
			query: {
				id: props.info.id,
			},
		});
	}
</script>

<style scoped lang="scss">
	main#normal {
		border-radius: 1rem;
		height: 14rem;
		max-width: 52.5rem;
		img {
			clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
			margin-right: 1.5rem;
			transition: 0.2s transform;
		}
		section {
			> article:nth-child(1) {
				padding-right: 1.5rem;
				color: var(--text-color);
				font-size: 13px;
			}
			> h3 {
				color: var(--l-pink);
			}
			> div {
				word-break: break-all;
				line-height: 32px;
				padding-right: 1.5rem;
				color: var(--title-color);
			}
			> a {
				width: 5rem;
				padding: 0.7rem 1rem;
				border-top-left-radius: 1rem;
				border-bottom-right-radius: 1rem;
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69);
				transform-origin: bottom right;
				transition: 0.2s transform;
				color: var(--bg);
				&:hover {
					transform: scale(1.1);
				}
			}
		}
		&:hover img {
			transform: scale(1.1) rotate(2deg);
		}
	}
	main#reverse {
		border-radius: 1rem;
		height: 14rem;
		max-width: 52.5rem;
		img {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
			margin-left: 1.5rem;
			transition: 0.2s transform;
		}
		section {
			> article:nth-child(1) {
				padding-left: 1.5rem;
				color: var(--text-color);
				font-size: 13px;
			}
			> h3 {
				color: var(--l-pink);
				padding-left: 1.5rem;
			}
			> div {
				word-break: break-all;
				line-height: 32px;
				padding-left: 1.5rem;
				color: var(--title-color);
			}
			> a {
				color: var(--bg);
				width: 5rem;
				padding: 0.7rem 1rem;
				border-top-right-radius: 1rem;
				border-bottom-left-radius: 1rem;
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69);
				transform-origin: bottom left;
				transition: 0.5s transform;
				&:hover {
					transform: scale(1.1);
				}
			}
		}
		&:hover img {
			transform: scale(1.1) rotate(2deg);
		}
	}
	@media screen and (max-width: 480px) {
		main#normal {
			padding: 0 !important;
			flex-direction: column;
			height: auto;
			img {
				clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
				margin: 0;
			}
			section {
				padding-left: 1.5rem;
			}
		}
		main#reverse {
			padding: 0 !important;
			flex-direction: column-reverse;
			height: auto;
			img {
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
				margin: 0;
			}
			section {
				padding-right: 1.5rem;
			}
		}
	}
</style>
