<template>
	<nav class="v-c-c p-f">
		<router-link to="/home">
			<span class="click v-c-c" ref="home"><i class="fa fa-home mr-1" />主页</span>
		</router-link>

		<router-link to="/article">
			<span class="click v-c-c" ref="article"><i class="fa-solid fa-book-open mr-1" />文章</span>
		</router-link>

		<router-link to="/talk">
			<span class="click v-c-c" ref="talk"><i class="fa-solid fa-comment mr-1" />说说</span>
		</router-link>

		<router-link to="/message">
			<span class="click v-c-c" ref="message"><i class="fa-solid fa-message mr-1" />留言</span>
		</router-link>

		<router-link to="/about">
			<span class="click v-c-c" ref="about"><i class="fa-solid fa-paper-plane mr-1" />关于</span>
		</router-link>

		<router-link to="/user/login">
			<span class="click v-c-c" ref="userlogin"><i class="fa-solid fa-user mr-1" />登录</span>
		</router-link>
	</nav>
</template>

<script setup>
	import { ref, watch, getCurrentInstance, onMounted } from "vue";
	import { useRoute } from "vue-router";

	const $this = getCurrentInstance();
	const route = useRoute();

	const el = ref();

	watch(el, (value, old) => {
		try {
			value.classList.add("select");
			if (old) {
				old.classList.remove("select");
			}
		} catch {}
	});

	watch(
		() => route.path,
		(value, old) => {
			el.value = $this.refs[value.replace(/\//g, "")];
		}
	);
	onMounted(() => {
		el.value = $this.refs[route.path.replace(/\//g, "")];
	});
</script>

<style scoped lang="scss">
	nav {
		top: 0;
		right: 0;
		height: 3.75rem;
		padding: 0.5rem 1rem;
		z-index: 10;
		span {
			padding: 0.5rem;
			color: #fff;
			text-shadow: 1px 1px 2px #666;
		}
	}
	@media screen and (max-width: 480px) {
		nav {
			height: auto;
			position: static !important;
			flex-direction: column;
			padding: 0;
			a {
				width: 10rem;
				height: 3rem;
				margin: 0.625rem 0;
				span {
					transition: 0.5s;
					height: 100%;
					color: var(--text-color);
					text-shadow: none;
					border-radius: 1rem;
					&:hover {
						+ div {
							width: 0;
						}
					}
				}
			}
			.select {
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69 100%);
				color: #fff;
				box-shadow: 0 0 0.75rem #ed6ea0;
			}
		}
	}
</style>
