<template>
	<h2>Lens</h2>
	<div class="ml-4">
		<p>Throw Ratio: {{ projector.throwRatio }}</p>
		<p>Zoom: 1.1</p>
		<p>Native Offset: {{ format((1 + projector.offset) * 100) }}%</p>
	</div>
	<h2>Image</h2>
	<div class="ml-4">
		<p>Brightness: {{ format(projector.lumen) }} Lumen</p>
		<p>
			Aspect Ratio: 16:9 / 1.77:1
			<span
				:style="{
					width: `${20 * projector.aspectRatio}px`,
					height: '20px',
				}"
				class="inline-block border border-current" />
		</p>
		<p>Resolution: 1920x1080px</p>
	</div>
</template>

<script setup lang="ts">
	import { type Projector } from "@/types";
	defineProps<{ projector: Projector }>();

	const formatter = Intl.NumberFormat("en", { maximumFractionDigits: 2 });
	const format = formatter.format;
</script>

<style lang="scss" scoped></style>
