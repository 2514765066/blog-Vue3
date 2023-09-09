<template>
	<main class="wh-100v d-f" id="login">
		<img src="@/assets/login.png" class="c-img wh-100 p-a" />

		<!-- 左边信息 -->
		<section class="w-100 h-c-c" v-media="480">
			<div>
				<h3><i class="fa-brands fa-slack mr-1" />博客社区</h3>

				<h1 class="mb-3">欢迎~<br />来到张铭洋的博客</h1>
				<p class="mb-3">一个提供资源和经验的地方</p>
				<div class="w-100">
					<i class="fa-brands fa-facebook-f"></i>
					<i class="fa-brands fa-twitter ml-4"></i>
					<i class="fa-brands fa-youtube ml-4"></i>
					<i class="fa-brands fa-instagram ml-4"></i>
					<i class="fa-brands fa-tiktok ml-4"></i>
					<i class="fa-brands fa-qq ml-4"></i>
					<i class="fa-brands fa-weixin ml-4"></i>
				</div>
			</div>
		</section>

		<router-view></router-view>
	</main>
</template>

<script setup></script>

<style scoped lang="scss">
	main#login {
		img {
			z-index: -5;
			filter: blur(3px);
		}
		> section {
			color: #fff;
			> div {
				h3 {
					font-size: 30px;
					margin-bottom: 10rem;
				}
				h1 {
					font-size: 40px;
				}
				p {
					letter-spacing: 5px;
				}
			}
		}
	}
</style>
