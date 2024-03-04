<template>
	<label :for="`input-${label}`" class="flex justify-between items-center">
		<span class="mr-8">{{ label }}</span>
		<div
			class="big border-b focus-within:border-current mb-1 self-scaling"
			:data-value="intermediateValue"
			:data-value2="intermediateValue2">
			<input
				class="bg-transparent text-center focus:outline-none"
				size="1"
				:id="`input-${label}`"
				:value="intermediateValue"
				@input="updateValue"
				@keypress.enter="(e) => updateValue(e, true)" />
			<p class="leading-none" v-if="separator">{{ separator }}</p>
			<input
				v-if="modelValue2 !== undefined"
				class="bg-transparent text-center focus:outline-none"
				size="1"
				:id="`input-${label}2`"
				:value="intermediateValue2"
				@input="updateValue2"
				@keypress.enter="(e) => updateValue2(e, true)" />
			<p v-if="unit" class="ml-1.5 leading-none">{{ unit }}</p>
		</div>
	</label>
</template>

<script setup lang="ts">
	import { useDebounceFn } from "@vueuse/core";
	import { ref, watch } from "vue";
	import { round } from "@/helpers";
	const emit = defineEmits<{
		"update:model-value": [value: string];
		"update:model-value2": [value: string];
	}>();
	const props = defineProps<{
		modelValue: string | number;
		modelValue2?: string | number;
		label: string;
		unit?: string;
		min?: number;
		separator?: string;
	}>();

	const intermediateValue = ref(props.modelValue);
	const intermediateValue2 = ref(props.modelValue2);

	const updateValue = (event: Event, immediate: boolean = false) => {
		const target = <HTMLInputElement>event.target;
		intermediateValue.value = target.value;
		if (immediate) emit("update:model-value", target.value);
		else emitChange(target.value);
	};
	const updateValue2 = (event: Event, immediate: boolean = false) => {
		const target = <HTMLInputElement>event.target;
		intermediateValue2.value = target.value;
		if (immediate) emit("update:model-value2", target.value);
		else emitChange2(target.value);
	};

	watch(
		() => props.modelValue,
		() => {
			intermediateValue.value = props.modelValue;
		}
	);
	watch(
		() => props.modelValue2,
		() => {
			intermediateValue2.value = props.modelValue2;
		}
	);

	const emitChange = useDebounceFn((value: string) => {
		emit("update:model-value", value);
	}, 1000);
	const emitChange2 = useDebounceFn((value: string) => {
		emit("update:model-value2", value);
	}, 1000);
</script>
