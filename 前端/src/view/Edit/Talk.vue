<template>
	<Header title="说说发布" />

	<main class="v-c-n" id="talkEdit">
		<section class="h shadow">
			<nav class="v-c-c">
				<span class="fs-15">写说说</span>
			</nav>
			<article class="v-sb-n">
				<div>
					<button @click="toTalk" class="mr-2">发布</button>
					<button @click="router.back()">取消</button>
				</div>
				<span class="fs-14 v-c-c mr-1" v-media="480">{{ data.time }}</span>
			</article>
			<article class="fs-16" contenteditable data-placeholder="发生什么趣事了？？？" ref="talk"></article>
			<div class="d-f">
				<img :src="fileToPath(file.file)" v-for="file of data.img" class="c-img mr-1 mb-1" />
				<button @click="changeFile.click()"><i class="fa-regular fa-image" /><br />图片</button>
				<input type="file" ref="changeFile" accept="image/jpeg, image/png" @change="uploadImg" />
			</div>
		</section>
	</main>
</template>

<script setup>
	import Header from "@/components/Header.vue";
	import { getFullTime } from "@/hooks/useTime";
	import { reactive, ref } from "vue";
	import { useRouter } from "vue-router";
	import { $bus } from "@/hooks/useBus";
	import { useTalkStore } from "@/store/useTalkStore";
	import { useMainStore } from "@/store/useMainStore";
	import { nanoid } from "nanoid";

	const router = useRouter();
	const changeFile = ref();
	const talk = ref();
	const talkStore = useTalkStore();
	const mainStore = useMainStore();
	const data = reactive({
		id: nanoid(),
		text: "",
		time: getFullTime(),
		msg: [],
		like: [],
		img: [],
	});

	//上传文件
	function uploadImg(e) {
		if (data.img.length == 9) {
			$bus.emit("tipShow", {
				title: "上传图片数量不能超过9",
				type: false,
			});
			return;
		}
		data.img.push({
			file: e.target.files[0],
			name: nanoid() + ".png",
		});
	}
	//文件转成路径
	function fileToPath(file) {
		if (file) {
			return window.URL.createObjectURL(file);
		}
	}
	//发布说说
	function toTalk() {
		const text = talk.value.innerText.trim();
		//防刁民
		if (text == "") {
			$bus.emit("tipShow", {
				title: "内容不能为空!!",
			});
			return;
		}

		const formData = new FormData();
		data.img.forEach(item => {
			formData.append("images", item.file, item.name);
		});
		mainStore.postImage(formData);

		//发送数据
		data.text = talk.value.textContent;
		const status = talkStore.postData(data);

		//提示
		if (status) {
			$bus.emit("tipShow", {
				title: "发布成功",
			});
			router.back();
		}
	}
</script>

<style scoped lang="scss">
	main#talkEdit {
		min-height: 18.75rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			> nav {
				height: 2.5rem;
				background-color: var(--bg-l);
				border: 1px solid var(--border);
				border-radius: 5px;
				> span {
					color: var(--title-color);
				}
			}
			> article:nth-child(2) {
				padding: 1rem 0;
				border-bottom: 1px solid var(--border);
				button {
					font-weight: bold;
					color: #fff;
					border-radius: 5px;
					width: 5.3125rem;
					height: 2.1875rem;
					background-color: var(--l-blue);
				}
				button:nth-child(2) {
					background-color: transparent;
					color: var(--text-color);
					border: 1px solid var(--border);
				}
				> input[type="text"] {
					padding: 0 0.3125rem;
					font-size: 16px;
					color: var(--title-color);
					width: 100%;
				}
				> div > input {
					width: 4.375rem;
				}
				> span {
					color: var(--text-color);
				}
			}
			> article:nth-child(3) {
				padding: 0.5rem 0.3125rem;
				min-height: 7.5rem;
				outline: none;
				color: var(--title-color);
				&:empty::before {
					content: attr(data-placeholder);
					color: var(--text-color);
				}
			}
			> div {
				flex-wrap: wrap;
				> img {
					width: 7.5rem;
					height: 7.1875rem;
					border-radius: 5px;
				}
				> button {
					width: 7.5rem;
					height: 7.1875rem;
					color: var(--text-color);
					border: 1px solid var(--border);
					background-color: var(--bg-l);
					border-radius: 5px;
					> i {
						font-size: 25px;
					}
				}
				> input {
					display: none;
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		main#talkEdit >section{
			padding: 1rem;
			>article:nth-child(2)>div{
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
