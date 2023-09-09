<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" appear>
		<main class="v-n-c p-r click" id="para" @click="toContext">
			<div class="o-h">
				<img :src="props.info.bg" class="c-img wh-100" />
			</div>

			<section class="h ml-3 fs-14">
				<span><i class="fa-solid fa-calendar-days mr-1" />{{ props.info.time }}</span>
				<span class="fs-15">{{ props.info.title }}</span>
			</section>
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
	main#para {
		padding: 20px 20px 0;
		border-left: 2px solid var(--cyan);
		&::before {
			transition: 0.5s;
			box-sizing: border-box;
			position: absolute;
			content: "";
			width: 10px;
			height: 10px;
			border: 3px solid var(--l-blue);
			background-color: var(--bg);
			border-radius: 50%;
			left: -6px;
		}
		div {
			width: 7.5rem;
			height: 7.5rem;
			border-radius: 0.5rem;
			img {
				transition: 0.5s transform;
				&:hover {
					transform: scale(1.1);
				}
			}
		}
		section {
			span {
				transition: 0.5s;
				line-height: 40px;
				color: var(--title-color);
			}
			span:nth-child(2):hover {
				color: var(--oranges);
				transform: translateX(10px);
			}
		}
		&:hover {
			&::before {
				border: 3px solid var(--oranges);
			}
		}
	}
</style>
