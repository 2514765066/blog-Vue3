<template>
	<article class="v-n-c p-a p-1" id="barrage" @animationend="isShow = false" :style="{ 'animation-duration': duration, top }" v-if="isShow">
		<i class="fa-regular fa-face-smile mr-1"></i>
		<span class="mr-1">游客：{{ props.info.msg }}</span>
	</article>
</template>

<script setup>
	import { defineProps, onMounted, ref } from "vue";

	const rows = Math.floor((window.innerHeight - 60) / 45); //行数
	const top = Math.floor(Math.random() * rows) * 45 + 60 + "px"; //随机高度
	let duration = ref(Math.random() * 10 + 4 + "s"); //持续时间
	let isShow = ref(false);
	let delay = Math.random() * 20000;

	const props = defineProps({
		info: Object,
		isNew: Boolean,
		length: Number,
	});

	if (props.length > 100) {
		delay = Math.random() * 20000 * (props.length % 100);
	}
	if (props.isNew) {
		duration.value = "5s";
		delay = "0s";
	}
	setTimeout(() => {
		isShow.value = true;
	}, delay);
</script>

<style scoped lang="scss">
	article#barrage {
		right: -510px;
		min-width: 100px;
		height: 2.5rem;
		border-radius: 1.25rem;
		z-index: 2;
		font-size: 1.25rem;
		background-color: rgba(#000, 0.4);
		i {
			font-size: 1.875rem;
		}
		&:hover {
			animation-play-state: paused;
		}
		animation-name: moveToLeft;
		animation-timing-function: linear;
	}
	@keyframes moveToLeft {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100vw - 510px));
		}
	}
</style>
