<template>
	<label
		:for="`input-${label}`"
		class="flex flex-col-reverse text-center leading-none input-shadow">
		<span class="smolfat">{{ label }}</span>
		<div
			class="big border-b mb-1 self-scaling"
			:data-value="round(<number>intermediateValue)">
			<input
				class="bg-transparent focus:outline-none"
				type="string"
				size="1"
				:id="`input-${label}`"
				:value="round(<number>intermediateValue)"
				@input="updateValue"
				@keypress.enter="(e) => updateValue(e, true)" />
			<p class="ml-1.5">{{ imperial ? "in" : "cm" }}</p>
		</div>
	</label>
</template>

<script setup lang="ts">
	import { useDebounceFn } from "@vueuse/core";
	import { inject, ref, watch, type Ref } from "vue";
	import { round } from "@/helpers";
	const emit = defineEmits<{
		"update:model-value": [value: string];
	}>();
	const props = defineProps<{
		modelValue: string | number;
		label: string;
	}>();

	const imperial = inject<Ref<boolean>>("imperial", ref(false));

	const intermediateValue = ref(props.modelValue);

	const updateValue = (event: Event, immediate: boolean = false) => {
		const target = <HTMLInputElement>event.target;
		intermediateValue.value = target.value;
		if (immediate) emit("update:model-value", target.value);
		else emitChange(target.value);
	};

	watch(
		() => props.modelValue,
		() => {
			intermediateValue.value = props.modelValue;
		}
	);

	const emitChange = useDebounceFn((value: string) => {
		emit("update:model-value", value);
	}, 1000);
</script>

<style>
	.input-shadow {
		filter: drop-shadow(0 0 20px theme(colors.dark.DEFAULT));
	}
	.self-scaling {
		display: grid;
		vertical-align: top;
		align-items: center;
		position: relative;
	}
	.self-scaling::after,
	.self-scaling input {
		width: auto;
		min-width: 1em;
		grid-area: 1 / 1;
		font: inherit;
		resize: none;
		background: none;
		appearance: none;
		height: 1em;
	}

	.self-scaling p {
		grid-area: 1 / 2;
	}

	.self-scaling::after {
		content: attr(data-value) "";
		visibility: hidden;
		white-space: pre-wrap;
		box-sizing: border-box;
	}

	.self-scaling:has(input:nth-of-type(2))::before,
	.self-scaling:has(input:nth-of-type(2)) input:nth-of-type(2) {
		width: auto;
		min-width: 1em;
		grid-area: 1 / 3;
		font: inherit;
		resize: none;
		background: none;
		appearance: none;
		height: 1em;
	}
	.self-scaling:has(input:nth-of-type(2))::after {
		content: attr(data-value2) "";
		visibility: hidden;
		white-space: pre-wrap;
		box-sizing: border-box;
	}
</style>
