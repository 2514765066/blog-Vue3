<template>
	<Mask :isShow="isShow" :z="998">
		<form @submit.prevent="dialogCallBack">
			<header class="v-sb-n p-1r">
				<span class="fs-20 c-t">{{ data.title }}</span>
				<i class="fa-solid fa-xmark click fs-20 c-te" @click="dialogClose"></i>
			</header>
			<section class="mt-3">
				<p class="v-n-c ml-2" v-if="data.subtitle">
					<i class="fa-solid fa-circle-exclamation mr-2" />
					<span class="fs-14 c-s">{{ data.subtitle }}</span>
				</p>
				<input :type="item.type" :placeholder="item.p || '请输入'" v-for="(item, index) of data.count" :key="index" v-model="inputData[index]" v-else required />
			</section>
			<footer class="v-e-n p-1r">
				<button class="mr-1r">确定</button>
				<button class="c-s" @click.prevent="dialogClose">取消</button>
			</footer>
		</form>
	</Mask>
</template>

<script setup>
	import Mask from "@/components/Mask.vue";
	import { $bus } from "@/hooks/useBus";
	import { onMounted, onUnmounted, reactive, ref } from "vue";

	const isShow = ref(false);
	const inputData = [];
	let data = reactive({
		title: "",
		subtitle: "",
		count: 0,
	});

	function dialogClose() {
		isShow.value = false;
		data = {
			title: "",
			subtitle: "",
			count: 0,
		};
		inputData.length = 0;
	}

	function dialogCallBack() {
		//只有确定按钮
		if (data.subtitle) {
			data.func();
			dialogClose();
			return;
		}

		if (inputData.some(item => item.trim() == "")) {
			$bus.emit("tipShow", {
				title: "输入内容不合法",
				type: false,
			});
			return;
		}
		//返回数据
		data.func(inputData);
		inputData.length = 0;
		dialogClose();
	}

	onMounted(() => {
		$bus.on("dialogShow", config => {
			data = { ...data, ...config };
			isShow.value = true;
		});
	});
	onUnmounted(() => {
		$bus.off("dialogShow");
	});
</script>

<style scoped lang="scss">
	form {
		border-radius: 0.5rem;
		background-color: #fff;
		min-width: 25rem;
		header {
			border-bottom: 1px solid #f0f0f0;
			padding: 0.9375rem 0.9375rem 0.625rem;
		}
		section {
			padding: 0 1rem;
			input {
				width: 100%;
				height: 2.25rem;
				border: 1px solid #e6e6e6;
				padding: 0 0.625rem;
				margin-bottom: 1rem;
			}
			input:last-child {
				margin-bottom: 0;
			}
			p > i {
				font-size: 1.375rem;
				color: var(--yellow);
			}
		}
		footer {
			button {
				width: 3.75rem;
				height: 1.875rem;
				border-radius: 0.3rem;
				&:nth-child(1) {
					background-color: var(--l-blue);
					color: #fff;
				}
				&:nth-child(2) {
					background-color: #fff;
					border: 1px solid #dcdfe6;
				}
			}
		}
	}

	@media screen and (max-width: 480px) {
		form {
			min-width: 0 !important;
			width: calc(100vw - 2rem) !important;
		}
	}
</style>
