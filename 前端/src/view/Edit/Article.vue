<template>
	<Header title="文章编辑" :url="url" />

	<main class="v-c-n">
		<section class="h shadow">
			<!-- 工具栏 -->
			<nav class="v-n-c p-1 f-w">
				<button @click="toNode('h2', '标题')">标题</button>
				<button @click="toNode('div', '文本')">文本</button>
				<button @click="changeFile.click()">背景</button>
				<input type="file" @change="uploadBg" ref="changeFile" />
				<button @click="toNode('aside', '提示')">提示</button>
				<button @click="toNode('ul', '<li>列表</li')"><i class="fa-solid fa-list" /></button>
				<button @click="toNode('ol', '<li>列表</li')"><i class="fa-solid fa-list-ol" /></button>
				<button @click="toNode('pre', '代码')"><i class="fa-solid fa-code" /></button>

				<button @click="toCommand('bold')"><i class="fa-solid fa-bold" /></button>
				<button @click="toCommand('italic')"><i class="fa-solid fa-italic" /></button>
				<button @click="toCommand('strikethrough')"><i class="fa-solid fa-strikethrough" /></button>
				<button @click="toLink"><i class="fa-solid fa-link" /></button>
				<input type="text" v-model="href" placeholder="请输入链接" />
			</nav>

			<!-- 按钮 -->
			<article class="v-sb-n">
				<div>
					<button class="mr-2 fw-b" @click="Save">保存</button>
					<button class="mr-2 fw-b" @click="router.back()">退出</button>
					<button class="mr-2 fw-b" @click="Delete" v-if="route.query.id ? true : false">删除</button>
				</div>
				<span class="v-c-c mr-1 fs-14" v-media="480">{{ data.time }}</span>
			</article>

			<!-- 标题栏 -->
			<article class="v-sb-n">
				<input type="text" placeholder="添加文章名称" maxlength="10" v-model="data.title" />
				<div class="v-n-c">
					<i class="fa-solid fa-tags mr-2"></i>
					<input type="text" placeholder="请输入标签" maxlength="5" v-model="data.tag" />
				</div>
			</article>

			<!-- 文本内容 -->
			<!-- eslint-disable vue/no-v-html -->
			<div contenteditable v-drag ref="content" @keydown="key" v-html="data.text"></div>
			<!-- eslint-enable -->
		</section>
	</main>
</template>

<script setup>
	import Header from "@/components/Header.vue";
	import { computed, onMounted, reactive, ref } from "vue";
	import { getFullTime } from "@/hooks/useTime";
	import { nanoid } from "nanoid";
	import { useRouter, useRoute } from "vue-router";
	import { $bus } from "@/hooks/useBus";
	import { fontCount } from "@/hooks/useFont";
	import { useMainStore } from "@/store/useMainStore";
	import { useArticleStore } from "@/store/useArticleStore";
	import { inEl } from "@/hooks/useInEl";
	import "@/assets/DragDropTouch.js";

	const mainStore = useMainStore();
	const articleStore = useArticleStore();
	const router = useRouter();
	const route = useRoute();

	const nowArticle = articleStore.articles.find(item => item.id == route.query.id);
	const href = ref("#");
	const content = ref(null);
	const changeFile = ref();
	const data = reactive({
		id: nanoid(),
		tag: "",
		title: "",
		subtitle: "",
		text: "",
		fontCount: 0,
		time: getFullTime(),
		updateTime: getFullTime(),
		bg: "",
		like: [],
		msg: [],
		...nowArticle,
	});
	//背景图
	const url = computed(() => {
		if (typeof data.bg === "object" && data.bg.file != "") {
			return window.URL.createObjectURL(data.bg);
		}
		if (typeof data.bg === "string" && data.bg != "") {
			return data.bg;
		}
	});

	//上传背景图
	function uploadBg(e) {
		data.bg = e.target.files[0];
	}
	//插入元素
	function toNode(nodeName, text) {
		const el = document.createElement(nodeName);
		el.innerHTML = text;
		el.draggable = true;
		content.value.appendChild(el);
	}
	//字体样式
	function toCommand(type) {
		let selection = window.getSelection();
		if (selection.rangeCount > 0) {
			document.execCommand(type, false, null);
		}
	}
	//添加链接
	function toLink() {
		const selection = window.getSelection();
		const range = selection.getRangeAt(0);
		if (selection.rangeCount > 0) {
			const link = document.createElement("a");
			link.href = href.value;
			link.contentEditable = false;
			// 将选中的文本插入到a标签中
			link.appendChild(range.extractContents());
			// 将a标签插入到原来的位置
			range.insertNode(link);
		}
	}
	//按下enter
	function key(e) {
		const select = window.getSelection();
		const node = select.anchorNode;
		if (inEl(node, content.value, "PRE") == false) return;

		const range = select.getRangeAt(0);
		let el;
		switch (e.key) {
			case "Enter":
				el = document.createTextNode("\n\r");
				break;
			case "{":
				el = document.createTextNode("{}");
				break;
			case "[":
				el = document.createTextNode("[]");
				break;
			case "<":
				el = document.createTextNode("<>");
				break;
			case "(":
				el = document.createTextNode("()");
				break;
			case '"':
				el = document.createTextNode('""');
				break;
			case "'":
				el = document.createTextNode("''");
				break;
			default:
				return;
		}
		e.preventDefault();
		range.insertNode(el);
		range.setStartAfter(el);
	}
	//保存
	function Save() {
		if (data.title.trim() == "") {
			$bus.emit("tipShow", {
				title: "标题不能为空",
			});
			return;
		}
		if (data.tag.trim() == "") {
			$bus.emit("tipShow", {
				title: "标签不能为空",
			});
			return;
		}
		if (content.value.innerText.trim() == "") {
			$bus.emit("tipShow", {
				title: "内容不能为空",
			});
			return;
		}

		//上传背景图
		if (typeof data.bg === "object") {
			const formData = new FormData();
			formData.append("images", data.bg, data.id + ".png");
			mainStore.postImage(formData);
		}

		data.text = content.value.innerHTML.replace(/ draggable="true"/g, "");
		data.subtitle = content.value.innerText.replace(/\n/g, " ").slice(0, 80);
		data.updateTime = getFullTime();
		data.fontCount = fontCount(data.subtitle);

		if (route.query.id) {
			const status = articleStore.putData(data);
			if (status) {
				$bus.emit("tipShow", {
					title: "保存成功",
				});
			}
			return;
		}
		const status = articleStore.postData(data);
		if (status) {
			$bus.emit("tipShow", {
				title: "保存成功",
			});
			router.push({
				path: "/edit/article",
				query: {
					id: data.id,
				},
			});
		}
	}
	//删除
	function Delete() {
		$bus.emit("dialogShow", {
			title: "提示",
			subtitle: "你确定要删除这篇文章吗？",
			func: () => {
				const status = articleStore.deleteData(data.id);
				if (status) {
					$bus.emit("tipShow", {
						title: "删除成功",
						type: true,
					});
					router.push({
						path: "/article",
					});
				}
			},
		});
	}
</script>

<style scoped lang="scss">
	main {
		background-color: var(--bg);
		padding: 1.75rem 0;
		> section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			> nav {
				height: 40px;
				border: 1px solid var(--border);
				border-radius: 5px;
				color: var(--title-color);
				background-color: var(--bg-l);
				> * {
					margin: 0 2.5px;
				}
				> input[type="file"] {
					display: none;
				}
				button {
					color: var(--title-color);
					padding: 0 8px;
					height: 30px;
					border-radius: 5px;
					border: 2px solid transparent;
					transition: 0.5s border;
					&:hover {
						border: 2px solid var(--border);
					}
				}
				> input[type="text"] {
					background-color: var(--bg);
					border: 1px solid var(--border);
					height: 1.25rem;
					color: var(--title-color);
					padding: 0 5px;
				}
			}
			> article {
				padding: 1rem 0;
				border-bottom: 1px solid var(--border);
				i {
					color: var(--text-color);
				}
				span {
					color: var(--text-color);
				}
				> div {
					> button {
						color: #fff;
						border-radius: 5px;
						width: 5.3125rem;
						height: 2.1875rem;
						background-color: var(--l-blue);
					}
					> button:nth-child(2) {
						color: var(--text-color);
						border: 1px solid var(--border);
						background-color: transparent;
					}
					> button:nth-child(3) {
						color: #fff;
						background-color: var(--red);
					}
					> input {
						width: 4.375rem;
						color: var(--title-color);
					}
				}
				> input[type="text"] {
					padding: 0 5px;
					font-size: 16px;
					color: var(--title-color);
				}
			}
			> div {
				color: var(--title-color);
				padding: 1rem 0;
				height: 60vh;
				overflow-x: hidden;
				overflow-y: auto;
				outline: none;
				cursor: default;
				&::v-deep strike {
					color: #999;
					outline: none;
				}
				&::v-deep u {
					color: var(--l-blue);
					outline: none;
				}
				&::v-deep a {
					cursor: pointer;
					color: var(--pink);
					outline: none;
					&:hover {
						text-decoration: underline;
						color: var(--l-blue);
					}
				}
				&::v-deep h2 {
					padding-bottom: 5px;
					border-bottom: 1px solid var(--border);
					margin: 20px 0;
					outline: none;
					font-size: 26px;
				}
				&::v-deep ol {
					flex-wrap: wrap;
					counter-reset: num;
					outline: none;
					li::before {
						content: counter(num);
						counter-increment: num;
						top: 2px;
						left: -2em;
						width: 17px;
						height: 17px;
						text-align: center;
						color: #fff;
						font-size: 12px;
					}
				}
				&::v-deep ul {
					flex-wrap: wrap;
					height: auto;
					outline: none;
					li::before {
						content: "";
						top: 7px;
						left: -1em;
						width: 6px;
						height: 6px;
					}
				}
				&::v-deep li {
					outline: none;
					list-style: none;
					position: relative;
					margin: 0.3125rem 0 0.3125rem 1.5625rem;
					&::before {
						position: absolute;
						border-radius: 50%;
						background-color: var(--pink);
					}
				}
				&::v-deep aside {
					background-color: var(--articletip);
					padding: 0.625rem;
					position: relative;
					margin: 1rem 0;
					&::before {
						content: "";
						top: 0;
						left: 0;
						position: absolute;
						width: 5px;
						height: 100%;
						background: var(--green);
					}
				}
				&::v-deep pre {
					tab-size: 4;
					margin: 0.625rem 0;
					font-size: 1rem;
					line-height: 1.5rem;
					padding: 2.5rem 1rem 1rem;
					white-space: pre-wrap;
					font-family: "", "Consolas";
					overflow-y: auto;
					background-color: #282c34;
					border-radius: 0.5rem;
					color: #fff;
					position: relative;
					&::-webkit-scrollbar-thumb {
						background-color: #e6e6e6;
						border-radius: 2em;
					}
					&::-webkit-scrollbar {
						height: 8px;
					}
					&::before {
						content: "";
						top: 1rem;
						left: 1rem;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: var(--red);
						position: absolute;
						box-shadow: 1.25rem 0 0 var(--yellow), 2.5rem 0 0 var(--green);
					}
				}
				&::v-deep img {
					width: 100%;
					height: auto;
					border-radius: 5px;
					object-fit: cover;
				}
				&::-webkit-scrollbar {
					width: 3px;
				}
				&::-webkit-scrollbar-thumb {
					background-color: #aaa;
					border-radius: 3px;
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		main > section {
			width: 100%;
			padding: 1rem !important;
			> nav {
				height: auto !important;
			}
			> article:nth-child(2) > div {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
			> div {
				&::-webkit-scrollbar {
					width: 10px;
				}
			}
		}
	}
</style>
