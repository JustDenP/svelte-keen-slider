<script lang="ts">
	import KeenSlider, { type KeenSliderPlugin } from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';
	import { onDestroy, onMount } from 'svelte';
	import KeenArrows from './KeenArrows.svelte';
	import KeenDots from './KeenDots.svelte';
	import './styles.css';
	import type { Classes, ExtendedKeenSliderInstance, ExtendedKeenSliderOptions } from './types.js';

	export let controlled: boolean = false;
	export let instance: ExtendedKeenSliderInstance | undefined = undefined;
	export let id: string | undefined = undefined;
	export let options: ExtendedKeenSliderOptions = {};
	export let plugins: KeenSliderPlugin[] = [];

	let slider: ExtendedKeenSliderInstance;
	let sliderNode: HTMLElement;
	let sliderSlides: number = 0;
	let currentSlide: number = 0;

	let progress: number = 0;

	export let classes: Classes = {};
	let keenClasses: Classes = {
		container: 'keen-slider__container',
		slider: 'keen-slider',
		slide: 'keen-slider__slide',
		dotsWrapper: 'keen-slider__dots',
		dot: 'keen-slider__dot',
		arrowsWrapper: 'keen-slider__arrows-wrapper',
		arrowLeftWrapper: 'keen-slider__prev',
		arrowRightWrapper: 'keen-slider__next',
		arrowLeft: 'keen-slider__prev-icon',
		arrowRight: 'keen-slider__next-icon',
		...classes
	};

	const updateSliderDetails = () => {
		if (slider) {
			progress = slider.track.details.progress;
			sliderSlides = slider.track.details.maxIdx;
			currentSlide = slider.track.details.rel;
		}
	};

	function applyDefaultMethods() {
		if (slider) {
			slider.options.initial = options.initial ?? 0;
			slider.on('slideChanged', updateSliderDetails);
			updateSliderDetails();
		}
	}

	$: if (!slider) {
		if (controlled && instance) {
			console.log('wooop');
			slider = instance;
			applyDefaultMethods();
		}
	}

	onMount(() => {
		if (!controlled) {
			slider = new KeenSlider(
				sliderNode,
				{
					...options,
					slideChanged: (slide: any) => {
						if (options.slideChanged) {
							options.slideChanged(slide);
						}
					}
				},
				plugins
			);
		}
		applyDefaultMethods();
	});

	onDestroy(() => {
		if (slider) {
			slider.destroy();
		}
	});
</script>

<div>
	<div class={keenClasses.container}>
		<!-- Arrow pagination -->
		{#if slider?.options?.arrows}
			<div class={keenClasses.arrowsWrapper}>
				<KeenArrows direction="prev" onClick={() => slider.prev()} disabled={currentSlide === 0} {keenClasses}>
					<slot name="prevArrow">
						<svg
							class={keenClasses.arrowLeft}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
						</svg>
					</slot>
				</KeenArrows>
				<KeenArrows direction="next" onClick={() => slider.next()} disabled={currentSlide === sliderSlides} {keenClasses}>
					<slot name="nextArrow">
						<svg
							class={keenClasses.arrowRight}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</slot>
				</KeenArrows>
			</div>
		{/if}

		<!-- Slides -->
		<div {id} class={keenClasses.slider} {...$$restProps} bind:this={sliderNode}>
			<slot />
		</div>
	</div>

	<!-- Dots pagination -->
	{#if slider?.options?.dots}
		<KeenDots {sliderSlides} {currentSlide} onClick={(idx) => slider.moveToIdx(idx)} {keenClasses} />
	{/if}
</div>
