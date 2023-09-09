<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" appear>
		<article class="d-f mt-1r w-100">
			<!-- 头像 -->
			<i class="fa-solid fa-circle-user" />
			<!-- 信息 -->
			<div class="h ml-2">
				<span class="fs-13"> {{ data.name }} </span>
				<p>{{ data.text }}</p>
				<span class="fs-12">{{ data.time }}</span>
			</div>
		</article>
	</transition>
</template>

<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		data: Object,
	});
</script>

<style scoped lang="scss">
	article {
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		i {
			font-size: 2.5rem;
			color: #aaa;
		}
		> div {
			width: 100%;
			> span:nth-child(1) {
				color: #9499a0;
			}
			> p {
				color: var(--title-color);
				margin: 0.5rem 0;
			}
			> span:nth-child(3) {
				color: #9499a0;
			}
		}
	}
</style>
