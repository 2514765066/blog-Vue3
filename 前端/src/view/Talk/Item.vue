<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" appear>
		<main id="talksmodule" class="h mt-2 mb-2 b-shadow p-r o-h">
			<!-- 信息 -->
			<section class="d-f a-c">
				<!-- 头像 -->
				<img :src="`${baseURL}/images/header.png`" class="c-img" />
				<!-- 信息 -->
				<div class="h ml-2 j-sb">
					<span class="fs-14 fw-b">
						{{ abouts.name }}
						<i class="fa-solid fa-clipboard-check ml-1" />
					</span>
					<span class="fs-13">{{ props.info.time }}</span>
				</div>
			</section>
			<!-- 内容 -->
			<p class="pr-1r">{{ props.info.text }}</p>
			<!-- 图片 -->
			<div>
				<img :src="name" v-for="name of props.info.img" class="c-img click mr-1 mb-1" @click="zoomImg" />
			</div>
			<!-- 展示 -->
			<div class="d-f">
				<span class="fs-13 mr-4">
					<i class="fa-solid fa-heart" />
					{{ props.info.like.length }}
				</span>
				<span class="fs-13">
					<i class="fa-solid fa-comment-dots" />
					{{ props.info.msg.length }}
				</span>
			</div>
			<!-- 评论 -->
			<Comment v-for="item of props.info.msg.slice(-viewCount).reverse()" :data="item" :key="item.time" />

			<More v-model="viewCount" :all="props.info.msg.length">查看更多</More>

			<!-- 操作 -->
			<section class="v-c-c p-a h-100">
				<div class="v-c-c"><i class="fa-solid fa-chevron-left" /></div>
				<button @click="toLike"><i class="fa-solid fa-heart" /><br />点<br />赞</button>
				<button @click="toMsg"><i class="fa-solid fa-message" /><br />评<br />论</button>
				<button v-if="per('edit')" @click="deleteData"><i class="fa-solid fa-trash-can" /><br />删<br />除</button>
			</section>
		</main>
	</transition>
</template>

<script setup>
	import { baseURL } from "@/api";
	import Comment from "@/components/Comment.vue";
	import { defineProps, computed, ref } from "vue";
	import { useRouter } from "vue-router";
	import { $bus } from "@/hooks/useBus";
	import { per } from "@/hooks/usePer";
	import { useMainStore } from "@/store/useMainStore";
	import { useAboutStore } from "@/store/useAboutStore";
	import { useTalkStore } from "@/store/useTalkStore";
	import { getFullTime } from "@/hooks/useTime";
	import More from "@/components/More.vue";

	const mainStore = useMainStore();
	const talkStore = useTalkStore();
	const aboutStore = useAboutStore();

	const abouts = aboutStore.abouts;
	const router = useRouter();
	const viewCount = ref(3);

	const props = defineProps({
		info: Object,
	});

	function toLike() {
		if (mainStore.token.username != "visitor") {
			const status = talkStore.toLike(props.info.id);
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
	function toMsg() {
		$bus.emit("dialogShow", {
			title: "发布评论",
			count: 1,
			func: data => {
				const status = talkStore.toMsg(props.info.id, {
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
	function deleteData() {
		$bus.emit("dialogShow", {
			title: "提示",
			subtitle: "你确定要删除说说吗？",
			func: () => {
				const status = talkStore.deleteData(props.info.id);
				if (status) {
					$bus.emit("tipShow", {
						title: "删除成功",
						type: true,
					});
				}
			},
		});
	}
	function zoomImg(e) {
		$bus.emit("zoomImgShow", {
			url: e.target.src,
		});
	}
</script>

<style scoped lang="scss">
	main#talksmodule {
		padding: 1rem 1.25rem;
		> section:first-child {
			height: 3.375rem;
			img {
				width: 2.8rem;
				height: 2.8rem;
				border-radius: 10px;
			}
			> div {
				line-height: 26px;
				> span:nth-child(1) {
					color: var(--oranges);
				}
				> span:nth-child(2) {
					color: #9499a0;
				}
			}
		}
		p {
			color: var(--title-color);
			margin: 0.625rem 0;
			font-size: 15px;
		}
		> div {
			color: #9499a0;
			> img {
				width: 7.5rem;
				height: 7.1875rem;
				border-radius: 5px;
			}
		}
		> :last-child {
			height: 9rem;
			border-radius: 0.5rem;
			right: 0;
			top: 0;
			transform: translateX(calc(100% - 2.5rem));
			transition: 0.5s transform;
			&:hover {
				transform: translateX(0);
				& > div > i {
					transform: rotate(180deg);
				}
			}
			> * {
				width: 2.5rem;
				height: 100%;
			}
			> div > i {
				color: var(--text-color);
				transition: 0.5s transform;
			}
			> button:nth-child(2) {
				background-color: var(--pink);
				color: #fff;
				border-bottom-left-radius: 0.5rem;
			}
			> button:nth-child(3) {
				background-color: var(--l-blue);
				color: #fff;
			}
			> :last-child {
				background-color: var(--red);
				color: #fff;
			}
		}
	}
	@media screen and (max-width: 480px) {
	}
</style>
