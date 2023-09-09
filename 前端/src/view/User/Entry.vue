<template>
	<article class="p-r">
		<input :type="props.type" required class="mb-2r" :value="modelValue" 
		@input="emit('update:modelValue', $event.target.value)" />
		<label class="p-a">{{ name }}</label>
		<slot></slot>
	</article>
</template>

<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		name: String,
		type: String,
		modelValue: String,
	});
	const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
	article {
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
</style>
