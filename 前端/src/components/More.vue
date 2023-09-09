<template>
	<div class="m-5 v-c-c" v-if="isMore">
		<span class="click" @click="emit('update:modelValue', $event.target.value + 4)">
			<slot></slot>
			<i class="fa-solid fa-angles-down ml-1" />
		</span>
	</div>
</template>

<script setup>
	import { defineProps, ref, computed } from "vue";

	const isMore = computed(() => props.modelValue < props.all);
	const props = defineProps({
		all: Number,
		modelValue: Number,
	});
	const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
	div {
		color: var(--text-color);
	}
</style>
