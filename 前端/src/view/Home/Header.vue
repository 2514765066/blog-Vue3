<template>
	<header class="p-r h-100v v-c-c">
		<img :src="homeBg" class="c-img wh-100 p-f" />

		<section class="p-f h-c-c">
			<p>ZMY's Blog</p>
			<span class="t-c">{{ typewriter.nowSay }}</span>
		</section>

		<div class="w-100 c-w p-a t-c">
			<i class="fa fa-angle-down"></i>
		</div>
		<Waves />
	</header>
</template>

<script setup>
	import Waves from "@/components/Waves.vue";
	import { computed, onMounted, onUnmounted, reactive } from "vue";
	import { useMainStore } from "@/store/useMainStore";
	import { useSayStore } from "@/store/useSayStore";
	import homel from "@/assets/home-l.png";
	import homed from "@/assets/home-d.png";

	const sayStore = useSayStore();
	const mainStore = useMainStore();

	const homeBg = computed(() => (mainStore.theme == "light" ? homel : homed));

	const typewriter = reactive({
		allSays: sayStore.says, //全部文字
		nowSay: "", //打字机展示
		index: 0, //目前索引
		nowLength: 1, //目前文字个数
		timer: undefined, //计时器
	});

	function enterTimer() {
		clearInterval(typewriter.timer);
		typewriter.timer = setInterval(() => {
			typewriter.nowSay = typewriter.allSays[typewriter.index].substring(0, typewriter.nowLength++);
			if (typewriter.nowLength - 1 == typewriter.allSays[typewriter.index].length) {
				deleteTimer();
			}
		}, 600);
	}
	function deleteTimer() {
		clearInterval(typewriter.timer);
		typewriter.timer = setInterval(() => {
			typewriter.nowSay = typewriter.allSays[typewriter.index].substring(0, typewriter.nowLength--);
			if (typewriter.nowLength == 0) {
				typewriter.index = (typewriter.index + 1) % typewriter.allSays.length;
				enterTimer();
			}
		}, 100);
	}
	onMounted(() => {
		enterTimer();
	});
	onUnmounted(() => {
		clearInterval(typewriter.timer);
	});
</script>

<style scoped lang="scss">
	header {
		z-index: -5;
		> section {
			color: #fff;
			p {
				font-size: 3.5rem;
				font-family: "pen";
			}
			span {
				font-family: "楷体";
				font-size: 1.5625rem;
				&::after {
					content: "";
					display: inline;
					height: 35px;
					border-right: 0.125rem solid #fff;
					animation: blink 1s infinite;
					@keyframes blink {
						0% {
							border-right-color: #fff;
						}
						100% {
							border-right-color: transparent;
						}
					}
				}
			}
		}
		> div {
			bottom: 3.125rem;
			font-size: 2.5rem;
			animation: fade-in-out-shake 1.5s infinite alternate;
			@keyframes fade-in-out-shake {
				from {
					opacity: 0;
					transform: translateY(0.625rem);
				}

				to {
					opacity: 1;
					transform: translateY(-0.625rem);
				}
			}
		}
	}
</style>
