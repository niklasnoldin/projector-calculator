<template>
	<h1 class="sr-only">Projector Calculator</h1>
	<main class="h-screen">
		<div class="absolute top-xl left-xl">
			<div class="flex flex-col">
				<label for="projector-select" class="smolfat">Projector</label>
				<select
					id="projector-select"
					class="big bg-transparent border-none text-inherit focus:underline focus:outline-none decoration-1 underline-offset-2">
					<option value="optoma-hd28e" selected>Optoma HD28e</option>
				</select>
			</div>
			<ProjectorDetails :projector="projector" />
		</div>
		<div
			class="md:hidden flex items-center justify-end h-full flex-col"
			:style="{
				'--screen-width': cm2css(renderData.imageWidth * 0.33),
			}">
			<div
				class="absolute bottom-xl mb-screenWidth pb-12 inset-x-xl flex flex-col items-center"
				:style="{
					height: `calc(${cm2css(renderData.distance)} - var(--screen-width))`,
				}">
				<div class="flex justify-center items-center grow">
					<Input label="distance" v-model="inputs.distance" />
				</div>
				<div
					class="flex text-center leading-none flex-col-reverse w-screenWidth">
					<p class="smolfat">offset</p>
					<p class="big mb-1 pb-px">{{ formatNumber(inputs.offset) }} cm</p>
				</div>
			</div>
			<ProjectorIconBirdsEye
				:style="{
					width: cm2css(projector.depth),
					height: 'auto',
				}" />
			<svg
				height="100"
				:width="100 * (renderData.imageWidth / renderData.distance)"
				:viewBox="`0 0 ${
					100 * (renderData.imageWidth / renderData.distance)
				} 100`"
				class="fill-current w-full flicker relative -z-10 pointer-events-none"
				:style="{
					width: cm2css(renderData.imageWidth),
					height: cm2css(renderData.distance),
					marginBottom: `calc(-1 * var(--screen-width))`,
				}"
				xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="gradient" gradientTransform="rotate(90)">
						<stop offset="0%" stop-color="currentColor" />
						<stop offset="100%" stop-color="transparent" />
					</linearGradient>
				</defs>
				<path
					:d="`M0 100H${100 * (renderData.imageWidth / renderData.distance)}L${
						50 * (renderData.imageWidth / renderData.distance) +
						projector.lensDiameter / 2
					} 0h${-projector.lensDiameter}Z`"
					fill="url('#gradient')" />
			</svg>
			<div class="flex justify-center h-screenWidth">
				<svg
					width="10"
					height="10"
					viewBox="0 0 10 10"
					preserveAspectRatio="none"
					class="fill-current w-12 h-full"
					xmlns="http://www.w3.org/2000/svg"
					:style="{ opacity: 0.5 + (inputs.lux / 4000) * 0.5 }">
					<path d="M0 10H10V0Z" />
				</svg>
				<div
					class="w-full bg-light flex flex-col leading-none items-center justify-center text-dark text-center"
					:style="{
						width: `calc(${cm2css(renderData.imageWidth)} - 6rem)`,
						opacity: 0.5 + (inputs.lux / 4000) * 0.5,
					}">
					<p class="big">
						{{ formatNumber(round(inputs.lux, 0)) }}
					</p>
					<p class="smolfat">lux</p>
				</div>
				<svg
					width="10"
					height="10"
					viewBox="0 0 10 10"
					preserveAspectRatio="none"
					class="fill-current w-12 h-full"
					xmlns="http://www.w3.org/2000/svg"
					:style="{ opacity: 0.5 + (inputs.lux / 4000) * 0.5 }">
					<path d="M0 0V10H10Z" />
				</svg>
			</div>
			<div class="flex pt-2 h-12 w-full">
				<Input label="height" v-model="inputs.height" />
				<div class="grow flex justify-center">
					<Input label="width" v-model="inputs.width" />
				</div>
				<Input label="diagonal" v-model="inputs.diagonal" />
			</div>
		</div>
		<div
			class="hidden md:flex items-end justify-end h-full"
			:style="{
				'--screen-width': cm2css(renderData.imageHeight * 0.33),
			}">
			<div class="absolute bottom-xl inset-x-xl flex justify-end">
				<div
					class="flex justify-center items-center"
					:style="{
						width: `calc(${cm2css(renderData.distance)} - var(--screen-width))`,
					}">
					<Input label="distance" v-model="inputs.distance" />
				</div>
				<div
					class="flex text-center leading-none flex-col-reverse w-screenWidth input-shadow"
					:class="inputs.offset < 0 && 'invisible'">
					<p class="smolfat">offset</p>
					<p class="big mb-1 pb-px">{{ formatNumber(inputs.offset) }} cm</p>
				</div>
			</div>
			<div
				:style="{
					width: cm2css(projector.depth),
				}">
				<ProjectorIcon class="h-auto w-full" />
				<div
					v-show="inputs.offset < 0"
					:style="{
						height: cm2css(projectorOffset),
					}"
					class="flex text-center justify-center leading-none flex-col-reverse w-full input-shadow">
					<p class="smolfat">offset</p>
					<p class="big mb-1 pb-px">{{ formatNumber(inputs.offset) }} cm</p>
				</div>
			</div>
			<svg
				width="100"
				:height="100 * (renderData.totalGraphicHeight / renderData.distance)"
				:viewBox="`0 0 100 ${
					100 * (renderData.totalGraphicHeight / renderData.distance)
				}`"
				class="fill-current w-full flicker relative pointer-events-none"
				:style="{
					height: cm2css(renderData.totalGraphicHeight),
					width: cm2css(renderData.distance),
					marginRight: `calc(-1 * var(--screen-width) - 12rem)`,
				}"
				xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="gradient-horizontal">
						<stop offset="0%" stop-color="currentColor" />
						<stop offset="100%" stop-color="#fff0" />
					</linearGradient>
				</defs>
				<path :d="shinePath" fill="url('#gradient-horizontal')" />
			</svg>
			<div
				class="w-48 pr-4 flex flex-col items-end"
				:style="{
					paddingBottom: cm2css(renderData.bottomOffset),
				}">
				<div
					:style="{
						height: `calc(${cm2css(renderData.imageHeight)} - 6rem)`,
					}"
					class="flex items-center">
					<Input label="height" v-model="inputs.height" />
				</div>
				<Input label="diagonal" v-model="inputs.diagonal" />
			</div>
			<div class="flex flex-col justify-end">
				<div
					class="w-screenWidth overflow-visible"
					:style="{
						paddingBottom: cm2css(renderData.bottomOffset),
					}">
					<div class="flex justify-center">
						<Input label="width" v-model="inputs.width" />
					</div>
					<svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						preserveAspectRatio="none"
						class="fill-current w-full h-12"
						xmlns="http://www.w3.org/2000/svg"
						:style="{ opacity: 0.5 + (inputs.lux / 4000) * 0.5 }">
						<path d="M0 10H10V0Z" />
					</svg>
					<div
						class="w-full bg-light flex flex-col leading-none items-center justify-center text-dark text-center"
						:style="{
							height: `calc(${cm2css(renderData.imageHeight)} - 6rem)`,
							opacity: 0.5 + (inputs.lux / 4000) * 0.5,
						}">
						<p class="big">
							{{ formatNumber(round(inputs.lux, 0)) }}
						</p>
						<p class="smolfat">lux</p>
					</div>
					<svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						preserveAspectRatio="none"
						class="fill-current w-full h-12"
						xmlns="http://www.w3.org/2000/svg"
						:style="{ opacity: 0.5 + (inputs.lux / 4000) * 0.5 }">
						<path d="M0 0H10V10Z" />
					</svg>
				</div>
			</div>
		</div>
	</main>
</template>
<script setup lang="ts">
	import { computed, reactive, ref, watch } from "vue";
	import ProjectorIcon from "@/components/ProjectorIcon.vue";
	import ProjectorIconBirdsEye from "@/components/ProjectorIconBirdsEye.vue";
	import { type Projector } from "@/types";
	import ProjectorDetails from "@/components/ProjectorDetails.vue";
	import Input from "@/components/Input.vue";
	import gsap from "gsap";
	import { formatNumber, round } from "@/helpers";

	import {
		breakpointsTailwind,
		useBreakpoints,
		useWindowSize,
	} from "@vueuse/core";
	const { width, height } = useWindowSize();
	const { md } = useBreakpoints(breakpointsTailwind);
	const windowAspectRatio = computed(() =>
		md.value
			? (width.value - 80) / (height.value - 80 - 56)
			: (width.value - 80) / (height.value - 80 - 49)
	);
	const graphicAspectRatio = computed(() =>
		md.value
			? (projector.depth + renderData.distance) / renderData.totalGraphicHeight
			: renderData.imageWidth / (projector.depth + renderData.distance)
	);
	gsap.defaults({
		ease: "power3.inOut",
		duration: 0.5,
	});
	const projector = reactive<Projector>({
		depth: 25,
		lensOffset: 5,
		maxZoom: 1.1,
		lensDiameter: 3,
		throwRatio: 1,
		aspectRatio: 16 / 9,
		offset: 0,
		lumen: 3500,
	});
	const distance = ref(100);
	const image = computed(() => {
		const width = distance.value / projector.throwRatio;
		const height = width / projector.aspectRatio;
		const offset = height * projector.offset;
		const diagonal = Math.sqrt(width ** 2 + height ** 2);
		const area = (width * height) / (100 * 100); // sqcm 2 sqm
		return { width, height, offset, diagonal, area };
	});

	const totalGraphicHeight = computed(() => {
		if (image.value.offset < 0)
			if (-image.value.offset > projector.lensOffset)
				return Math.max(
					-image.value.offset + projector.lensOffset + projector.lensDiameter,
					image.value.height
				);
			else
				return image.value.height + projector.lensOffset + image.value.offset;
		else return projector.lensOffset + image.value.offset + image.value.height;
	});

	const bottomOffset = computed(() => {
		if (image.value.offset < 0) return 0;
		return image.value.offset + projector.lensOffset;
	});
	const projectorOffset = computed(() => {
		if (renderData.imageOffset < 0)
			return -renderData.imageOffset - projector.lensOffset;
		else return 0;
	});

	const shinePath = computed(() => {
		const totalHeightInSvgSpace =
			100 * (renderData.totalGraphicHeight / renderData.distance);
		const lensCenter =
			renderData.totalGraphicHeight -
			((renderData.imageOffset < 0 ? 0 : projector.lensOffset) +
				Math.max(-renderData.imageOffset, 0));
		const lensUpper = lensCenter - projector.lensDiameter / 2;
		const lensLower = lensCenter + projector.lensDiameter / 2;
		const relativeLensUpper = lensUpper / renderData.totalGraphicHeight;
		const relativeLensLower = lensLower / renderData.totalGraphicHeight;

		const topOffsetRight =
			(renderData.imageOffset < 0
				? Math.max(0, renderData.totalGraphicHeight - renderData.imageHeight)
				: 0) / renderData.totalGraphicHeight;

		return `M0 ${totalHeightInSvgSpace * relativeLensUpper}L0 ${
			totalHeightInSvgSpace * relativeLensLower
		}L100 ${
			totalHeightInSvgSpace *
			(topOffsetRight + renderData.imageHeight / renderData.totalGraphicHeight)
		}L100 ${totalHeightInSvgSpace * topOffsetRight}Z`;
	});

	const inputs = reactive({
		distance: distance.value,
		width: image.value.width,
		height: image.value.height,
		diagonal: image.value.diagonal,
		offset: image.value.offset,
		lux: projector.lumen / image.value.area,
	});

	const renderData = reactive({
		totalGraphicHeight: totalGraphicHeight.value,
		distance: distance.value,
		imageHeight: image.value.height,
		imageOffset: image.value.offset,
		imageWidth: image.value.width,
		bottomOffset: bottomOffset.value,
	});

	const updatingFromWithin = ref(false);

	watch(
		() => projector.throwRatio,
		() => {
			if (updatingFromWithin.value) return;
			updateValues();
		}
	);

	watch(
		() => inputs.distance,
		() => {
			if (updatingFromWithin.value) return;
			distance.value = Math.max(50, parseFloat(inputs.distance.toString()));
			updateValues();
		}
	);
	watch(
		() => inputs.width,
		() => {
			if (updatingFromWithin.value) return;
			distance.value = inputs.width * projector.throwRatio;
			updateValues();
		}
	);
	watch(
		() => inputs.height,
		() => {
			if (updatingFromWithin.value) return;
			distance.value =
				inputs.height * projector.aspectRatio * projector.throwRatio;
			updateValues();
		}
	);
	watch(
		() => inputs.diagonal,
		() => {
			if (updatingFromWithin.value) return;
			const width =
				(inputs.diagonal * projector.aspectRatio) /
				Math.sqrt(projector.aspectRatio ** 2 + 1);
			distance.value = width * projector.throwRatio;
			updateValues();
		}
	);
	function cm2css(cm: number): string {
		if (md.value)
			if (graphicAspectRatio.value > windowAspectRatio.value)
				return `calc(${
					cm / (projector.depth + renderData.distance)
				} * (100vw - var(--main-padding) * 2))`;
			else
				return `calc(${
					cm / renderData.totalGraphicHeight
				} * (100vh - var(--main-padding) * 2 - 56px))`;
		else if (graphicAspectRatio.value < windowAspectRatio.value)
			return `calc(${
				cm / (projector.depth + renderData.distance)
			} * (100vh - var(--main-padding) * 2 - 49px))`;
		else
			return `calc(${
				cm / renderData.imageWidth
			} * (100vw - var(--main-padding) * 2))`;
	}
	function updateValues() {
		updatingFromWithin.value = true;
		gsap.to(inputs, {
			offset: image.value.offset,
			lux: projector.lumen / image.value.area,
			distance: distance.value,
			diagonal: image.value.diagonal,
			width: image.value.width,
			height: image.value.height,
			onComplete() {
				updatingFromWithin.value = false;
			},
		});
		gsap.to(renderData, {
			totalGraphicHeight: totalGraphicHeight.value,
			distance: distance.value,
			imageHeight: image.value.height,
			imageWidth: image.value.width,
			imageOffset: image.value.offset,
			bottomOffset: bottomOffset.value,
		});
	}
</script>

<style scoped>
	.flicker {
		/* animation: flicker 0.1s steps(3) infinite; */
	}
	@keyframes flicker {
		from {
			opacity: 0.75;
		}
		to {
			opacity: 1;
		}
	}
</style>
