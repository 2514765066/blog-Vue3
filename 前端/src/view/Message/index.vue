<template>
	<main id="message" class="wh-100v p-r h v-c-c o-h">
		<!-- 背景 -->
		<img src="@/assets/message.png" class="c-img wh-100 p-a" />

		<h1 class="mb-4">留言板</h1>
		<form class="d-f" @submit.prevent="postMsg">
			<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" leave-active-class="animate__bounceOutRight" appear>
				<input type="text" placeholder="说点什么吧" maxlength="20" v-model="msg" required />
			</transition>
			<button class="ml-2">发送</button>
		</form>
		<!-- 初始化留言 -->
		<Barrage v-for="item of messages" :info="item" :key="item.id" :length="messages.length" />

		<!-- 新发送的留言 -->
		<Barrage v-for="(nitem, index) of newMsg" :info="{ msg: nitem }" :key="-index" :isNew="true" />
	</main>
</template>

<script setup>
	import Barrage from "./Barrage.vue";
	import { useMessageStore } from "@/store/useMessageStore";
	import { reactive, ref, watch } from "vue";
	import { $bus } from "@/hooks/useBus";
	const messageStore = useMessageStore();
	const messages = messageStore.messages;

	let msg = ref("");
	let newMsg = reactive([]);

	function postMsg() {
		if (msg.value.trim() == "") {
			$bus.emit("tipShow", {
				title: "输入内容不合法",
				type: false,
			});
			return;
		}
		const status = messageStore.postData({
			msg: msg.value,
		});
		if (status) {
			$bus.emit("tipShow", {
				title: "发送成功",
			});
			newMsg.push(msg.value);
			msg.value = "";
		}
	}
</script>

<style scoped lang="scss">
	main#message {
		color: #fff;
		img {
			filter: brightness(90%) contrast(80%);
			z-index: -5;
		}
		> form {
			> * {
				border: 2px solid #fff;
				border-radius: 1.25rem;
				padding: 0 1.25rem;
				color: #fff;
				background-color: transparent;
				height: 2.5rem;
			}
			input {
				width: 15.625rem;
				&::placeholder {
					color: #eee;
				}
				&:valid {
					+ button {
						display: block;
					}
				}
			}
			button {
				display: none;
			}
		}
	}
</style>
