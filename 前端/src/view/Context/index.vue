<template>
	<!-- 头部 -->
	<Header :title="nowArticle.title" :url="nowArticle.bg">
		<span class="mr-1 ml-1"><i class="fa-solid fa-calendar-days mr-1" />发布于:{{ nowArticle.time }}</span>
		<span class="mr-1 ml-1"><i class="fa-solid fa-rotate-right mr-1" />更新于:{{ nowArticle.updateTime }}</span>
		<span class="mr-1 ml-1"><i class="fa-solid fa-pencil mr-1" />字数:{{ nowArticle.fontCount }}</span>
		<span class="mr-1 ml-1"><i class="fa-solid fa-tags mr-1" />标签:{{ nowArticle.tag }}</span>
	</Header>

	<!-- 中部 -->
	<main class="v-c-n">
		<!-- 格式页面元素 -->
		<section class="h shadow">
			<!-- eslint-disable vue/no-v-html -->
			<div v-html="nowArticle.text" ref="content"></div>
			<!-- eslint-enable -->
			<!-- 点赞评论信息 -->
			<aside class="h-n-c mt-5r">
				<!-- 点赞 -->
				<div>
					<button class="fs-16 mb-2r mr-1r" @click="toLike"><i class="fa-solid fa-heart mr-1" />点赞 {{ nowArticle.like.length }}</button>
					<button class="fs-16 mb-2r" @click="toMsg"><i class="fa-solid fa-message mr-1" />评论 {{ nowArticle.msg.length }}</button>
				</div>
				<!-- 信息 -->
				<div class="h fs-12 w-100">
					<span>
						<strong class="mr-1"><i class="fa-regular fa-circle-user fs-14 mr-1" />本文作者:</strong>
						{{ abouts.name }}
					</span>
					<span>
						<strong class="mr-1"><i class="fa-solid fa-link fs-12 mr-1" />本文链接:</strong>
						{{ link }}
					</span>
				</div>
				<!-- 评论 -->
				<Comment v-for="item of nowArticle.msg.slice(-viewCount).reverse()" :data="item" :key="item.time" />

				<More v-model="viewCount" :all="nowArticle.msg.length">查看更多评论</More>
			</aside>
		</section>

		<!-- 目录和操作 -->
		<section v-media="480">
			<!-- 目录 -->
			<article class="shadow h p-1r p-s">
				<!-- 标题 -->
				<div class="mb-2"><i class="fa-solid fa-list-ul mr-1"></i>目录</div>
				<!-- 列表 -->

				<aside v-for="(item, index) of lists" @click="toView($event, item)">{{ item.textContent }}</aside>
			</article>
		</section>
	</main>
	<Footer />
</template>

<script setup>
	import Footer from "@/components/Footer.vue";
	import More from "@/components/More.vue";
	import Header from "@/components/Header.vue";
	import { useArticleStore } from "@/store/useArticleStore";
	import { useAboutStore } from "@/store/useAboutStore";
	import Comment from "@/components/Comment.vue";
	import { computed, onMounted, reactive, ref, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useMainStore } from "@/store/useMainStore";
	import { getFullTime } from "@/hooks/useTime";
	import { $bus } from "@/hooks/useBus";
	import hljs from "highlight.js";
	import "highlight.js/styles/felipec.css";

	const route = useRoute();
	const router = useRouter();
	const articleStore = useArticleStore();
	const aboutStore = useAboutStore();
	const mainStore = useMainStore();

	const articles = articleStore.articles;
	const abouts = aboutStore.abouts;
	const viewCount = ref(4);

	//本文连接
	const link = computed(() => window.location.href);
	//ref元素
	const content = ref();
	//当前文章
	const nowArticle = articles.find(item => item.id == route.query.id);
	//目录
	let lists = reactive([]);
	//目前选中的目录
	let nowList = ref();

	//监视添加样式
	watch(nowList, (newValue, oldValue) => {
		newValue.classList.add("selected");
		if (oldValue) {
			oldValue.classList.remove("selected");
		}
	});

	//滚动到可视区
	function toView(e, list) {
		const el = lists.find(item => item == list);
		el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
		nowList.value = e.target;
	}
	//点赞
	function toLike() {
		if (mainStore.token.username != "visitor") {
			const status = articleStore.toLike(nowArticle.id);
			if (status) {
				$bus.emit("tipShow", {
					title: "点赞成功",
					type: true,
				});
			} else {
				$bus.emit("tipShow", {
					title: "你已经点过赞了",
					type: false,
				});
			}
		} else {
			$bus.emit("dialogShow", {
				title: "提示",
				subtitle: "您还没有登录,点击确定跳转到登录页面",
				func: () => {
					router.push("/user/login");
				},
			});
		}
	}
	//评论
	function toMsg() {
		$bus.emit("dialogShow", {
			title: "发布评论",
			count: 1,
			func: data => {
				const status = articleStore.toMsg(nowArticle.id, {
					name: mainStore.token.username,
					text: data[0],
					time: getFullTime(),
				});
				if (status) {
					$bus.emit("tipShow", {
						title: "发布成功",
						type: true,
					});
				}
			},
		});
	}

	//获取目录
	onMounted(() => {
		document.querySelectorAll("pre").forEach(item => {
			hljs.highlightElement(item);
		});

		Object.assign(
			lists,
			Array.from(content.value.childNodes).filter(item => item.tagName == "H2")
		);
	});
</script>

<style scoped lang="scss">
	main {
		min-height: 60rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			margin: 0 0.625rem;
			color: var(--title-color);
		}
		section:nth-child(1) {
			width: 53.75rem;
			padding: 2rem 2.5rem;
			> div {
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
					padding: 2.5rem 1rem 1rem;
					line-height: 1.5rem;
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
			> aside {
				color: var(--subtitle-color);
				> div:nth-child(1) {
					> button {
						color: #fff;
						background-color: var(--l-pink);
						width: 6rem;
						height: 2.2rem;
						border-radius: 0.5rem;
					}
					> :nth-child(2) {
						background-color: var(--l-blue);
					}
				}
				> div:nth-child(2) {
					padding: 1rem 2rem;
					background-color: var(--articletip);
					border-radius: 0.5rem;
					> span {
						line-height: 1.5rem;
						word-break: break-all;
					}
				}
			}
		}
		section:nth-child(2) {
			width: 18rem;
			> article {
				top: 3.75rem;
				max-height: 70vh;
				overflow: auto;
				aside {
					height: 2rem;
					font-size: 14px;
					display: flex;
					align-items: center;
					transition: 0.5s;
					border-radius: 3px;
					cursor: pointer;
					padding: 0.625rem;
					&:hover {
						background-color: var(--l-blue);
						color: #fff;
					}
				}
			}
			.selected {
				transition: 0.5s;
				background-color: var(--pink);
				color: #fff;
			}
		}
	}
	@media screen and (max-width: 480px) {
		main > section:nth-child(1) {
			margin: 0 !important;
			width: 100% !important;
			padding: 1rem !important;
			> aside > div:nth-child(2) {
				padding: 1rem !important;
			}
		}
	}
</style>
