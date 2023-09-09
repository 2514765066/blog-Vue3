<template>
	<form class="w-100 h-c-c" @submit.prevent="toReg">
		<!-- 标题 -->
		<h1 class="mb-2r">注册</h1>

		<Entry name="用户名" type="text" v-model="data.username">
			<i class="fa-solid fa-user-large"></i>
		</Entry>

		<Entry name="密码" type="password" v-model="data.password">
			<i class="fa-solid fa-lock"></i>
		</Entry>

		<Entry name="重复密码" type="password" v-model="data.rpassword">
			<i class="fa-solid fa-lock"></i>
		</Entry>

		<button class="fs-16 mt-3">注册</button>
		<!--  跳转登录 -->
		<aside class="fs-12 mt-2">
			已有账号,
			<span class="click" @click="toLog">点击登录</span>
		</aside>
	</form>
</template>

<script setup>
	import { useRouter } from "vue-router";
	import Entry from "./Entry.vue";
	import { $bus } from "@/hooks/useBus";
	import { useMainStore } from "@/store/useMainStore";

	const mainStore = useMainStore();
	const router = useRouter();
	const data = {
		username: "",
		password: "",
		rpassword: "",
	};

	function toReg() {
		if (data.username.trim() == "" || data.password.trim() == "") {
			$bus.emit("tipShow", {
				title: "用户名或密码不合法",
			});
			return;
		}
		if (data.password != data.rpassword) {
			$bus.emit("tipShow", {
				title: "两次密码不相同",
				type: false,
			});
			return;
		}
		//请求
		mainStore.toReg(data).then(status => {
			if (status) {
				$bus.emit("tipShow", {
					title: "注册成功请登录",
				});
				toLog();
			} else {
				$bus.emit("tipShow", {
					title: "用户名已被注册",
					type: false,
				});
			}
		});
	}
	function toLog() {
		router.replace({
			path: "/user/login",
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
