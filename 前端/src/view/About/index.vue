<template>
	<Header title="关于" />

	<main class="v-c-n" id="about">
		<section class="h-n-c shadow">
			<nav class="v-c-c w-100">
				<span class="fs-15">博主个人信息</span>
			</nav>
			<article class="v-sb-n w-100">
				<button class="mr-2" v-if="per('edit')" @click="putData">保存</button>
				<span class="fs-14 v-c-c mr-1">{{ getFullTime() }}</span>
			</article>
			<div class="d-f w-100">
				<Mine v-media="480" />
				<article class="h-se-n h-100 f-1 pl-5r">
					<div class="v-sb-c">
						<strong>用户名:</strong>
						<input type="text" v-model="data.username" class="fs-18 f-1" readonly />
					</div>
					<div class="v-sb-c">
						<strong>名称:</strong>
						<input type="text" v-model="data.name" class="fs-18 f-1" :disabled="!per('edit')" />
					</div>
					<div class="v-sb-c">
						<strong>名言:</strong>
						<input type="text" v-model="data.said" class="fs-18 f-1" :disabled="!per('edit')" />
					</div>
					<div class="v-sb-c">
						<strong>公告:</strong>
						<input type="text" v-model="data.bulletin" class="fs-18 f-1" :disabled="!per('edit')" />
					</div>
				</article>
			</div>
		</section>
	</main>

	<Footer />
</template>

<script setup>
	import Footer from "@/components/Footer.vue";
	import Header from "@/components/Header.vue";
	import { useAboutStore } from "@/store/useAboutStore";
	import { useMainStore } from "@/store/useMainStore";
	import { getFullTime } from "@/hooks/useTime";
	import { computed, reactive } from "vue";
	import { per } from "@/hooks/usePer";
	import Mine from "@/components/Mine.vue";
	import { $bus } from "@/hooks/useBus";

	const aboutStore = useAboutStore();
	const mainStore = useMainStore();

	const token = mainStore.token;
	const abouts = aboutStore.abouts;

	const data = reactive(abouts);

	function putData() {
		const result = aboutStore.putData(data);
		if (result) {
			$bus.emit("tipShow", {
				title: "保存成功",
			});
		}
	}
</script>

<style scoped lang="scss">
	main#about {
		background-color: var(--bg);
		padding: 1.75rem 0;
		> section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			> nav {
				height: 2.5rem;
				background-color: var(--bg-l);
				border: 1px solid var(--border);
				border-radius: 5px;
				color: var(--title-color);
			}
			> article {
				padding: 1rem 0;
				border-bottom: 1px solid var(--border);
				color: var(--text-color);
				button {
					font-weight: bold;
					color: #fff;
					border-radius: 5px;
					width: 5.3125rem;
					height: 2.1875rem;
					background-color: var(--l-blue);
				}
			}
			> div {
				padding-top: 1rem;
				color: var(--subtitle-color);
				> main {
					width: 13.75rem;
					padding: 1rem;
					&:hover {
						img {
							transform: rotate(360deg);
						}
					}
					img {
						width: 9.6875rem;
						height: 9.6875rem;
						border-radius: 50%;
						transition: 1s transform;
					}
					> i {
						font-size: 155px;
						color: var(--text-color);
					}
					> div {
						color: var(--text-color);
						text-align: center;
						word-break: break-all;
					}
					> p {
						color: var(--title-color);
						text-align: center;
					}
					:last-child {
						i {
							margin: 0 0.5rem;
						}
						.fa-github {
							color: var(--title-color);
						}
						.fa-qq {
							color: var(--l-blue);
						}
						.fa-weixin {
							color: var(--green);
						}
						.fa-bilibili {
							color: var(--l-pink);
						}
					}
				}
				> article {
					> div {
						padding-bottom: 1rem;
						border-bottom: 1px solid var(--border);
						font-size: 1.25rem;
						> input {
							color: var(--text-color);
							text-align: end;
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		main#about > section {
			padding: 1rem 1rem 2rem;
			> div > article {
				padding: 0.5rem !important;
				> div {
					padding-top: 30px;
					>strong{
						font-size: 1.125rem;
					}
					>input{
						font-size: 1rem;
					}
				}
				> div:first-child {
					padding-top: 0;
				}
			}
		}
	}
</style>
