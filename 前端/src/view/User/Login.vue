<template>
	<form class="w-100 h-c-c" @submit.prevent="toLogin">
		<!-- 标题 -->
		<h1 class="mb-2r">登录</h1>

		<Entry name="用户名" type="text" v-model="data.username">
			<i class="fa-solid fa-user-large"></i>
		</Entry>
		<Entry name="密码" type="password" v-model="data.password">
			<i class="fa-solid fa-lock"></i>
		</Entry>

		<button class="fs-16">登录</button>
		<!-- 跳转注册 -->
		<aside class="fs-12 mt-2">
			还有没有账号?
			<span class="click" @click="toReg">点击注册</span>
		</aside>
	</form>
</template>

<script setup>
	import { useRouter } from "vue-router";
	import Entry from "./Entry.vue";
	import { reactive } from "vue";
	import { $bus } from "@/hooks/useBus";
	import { useMainStore } from "@/store/useMainStore";

	const mainStore = useMainStore();

	const router = useRouter();
	const data = reactive({
		username: "",
		password: "",
	});

	function toLogin() {
		if (data.username.trim() == "" || data.password.trim() == "") {
			$bus.emit("tipShow", {
				title: "用户名或密码不合法",
			});
			return;
		}
		//请求
		mainStore.toLogin(data).then(status => {
			if (status) {
				$bus.emit("tipShow", {
					title: "登录成功!欢迎您",
				});
				router.back();
			} else {
				$bus.emit("tipShow", {
					title: "用户名或密码错误",
					type: false,
				});
			}
		});
	}
	function toReg() {
		router.replace({
			path: "/user/register",
		});
	}
</script>

<style scoped lang="scss">
	form {
		color: #fff;
		> article {
			input {
				background-color: transparent;
				border-bottom: 1px solid #fff;
				color: #fff;
				width: 300px;
				font-size: 1.0625rem;
				padding: 5px 0;
				&::placeholder {
					color: #fff;
				}
				&::-ms-clear {
					display: none;
				}
				&::-ms-reveal {
					display: none;
				}
				&::-o-clear {
					display: none;
				}
				&:focus {
					+ label {
						top: -20px;
					}
				}
				&:valid {
					+ label {
						top: -20px;
					}
				}
			}
			label {
				transition: 0.5s;
				top: 0;
				left: 0;
				font-size: 0.875rem;
			}
			i {
				position: absolute;
				right: 0;
			}
		}
		> button {
			padding: 10px;
			width: 18.75rem;
			background-color: var(--l-pink);
			color: #fff;
			border-radius: 5px;
		}
		> div {
			width: 300px;
		}
		> aside > span {
			color: var(--oranges);
		}
	}
</style>
