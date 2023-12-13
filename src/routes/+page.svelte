<script lang="ts">
	import { AdaptiveHeightPlugin, AutoplayPlugin, ThumbnailPlugin, WheelControlsPlugin } from '$lib/plugins.js';
	import type { ExtendedKeenSliderInstance } from '$lib/types.js';
	import KeenSlider from 'keen-slider';
	import { onMount } from 'svelte';
	import KeenSliderRoot from '../lib/KeenSliderRoot.svelte';

	const sliderId = 'my-keen-slider';
	const thumbnailsId = 'thumbnails';
	let slider: ExtendedKeenSliderInstance;
	let thumbnails: ExtendedKeenSliderInstance;

	onMount(() => {
		slider = new KeenSlider(
			`#${sliderId}`,
			{
				initial: 0,
				slides: { perView: 1, spacing: 15 },
				arrows: true,
				autoPlayPlugin: {
					delay: 3000
				}
			},
			[WheelControlsPlugin, AdaptiveHeightPlugin]
		);

		thumbnails = new KeenSlider(
			`#${thumbnailsId}`,
			{
				initial: 0,
				slides: {
					perView: 4,
					spacing: 10
				}
			},
			[ThumbnailPlugin(slider)]
		);
	});
</script>

<a href="/test">Test page</a>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="container">
	<!-- Thumbnails -->
	<h1>Thumbnails</h1>
	<div>
		<KeenSliderRoot controlled instance={slider} id={sliderId}>
			<div class="keen-slider__slide number-slide1">1</div>
			<div class="keen-slider__slide number-slide2">2</div>
			<div class="keen-slider__slide number-slide3">3</div>
			<div class="keen-slider__slide number-slide4">4</div>
			<div class="keen-slider__slide number-slide5">5</div>
			<div class="keen-slider__slide number-slide6">6</div>
		</KeenSliderRoot>

		<KeenSliderRoot
			instance={thumbnails}
			id={thumbnailsId}
			classes={{
				slider: 'keen-slider thumbnail'
			}}
		>
			<div style="height: 200px;" class="keen-slider__slide number-slide1">1</div>
			<div style="height: 200px;" class="keen-slider__slide number-slide2">2</div>
			<div style="height: 200px;" class="keen-slider__slide number-slide3">3</div>
			<div style="height: 200px;" class="keen-slider__slide number-slide4">4</div>
			<div style="height: 200px;" class="keen-slider__slide number-slide5">5</div>
			<div style="height: 200px;" class="keen-slider__slide number-slide6">6</div>
		</KeenSliderRoot>
	</div>

	<!-- Single slider -->
	<h1>Single slider</h1>
	<KeenSliderRoot
		style="height: 200px;"
		options={{
			slides: { perView: 1, spacing: 15 },
			arrows: true,
			dots: true,
			autoPlayPlugin: {
				delay: 3000
			}
		}}
		plugins={[AutoplayPlugin, WheelControlsPlugin, AdaptiveHeightPlugin]}
	>
		<div class="keen-slider__slide number-slide1" style="height: 75px;">1</div>
		<div class="keen-slider__slide number-slide2" style="height: 100px;">2</div>
		<div class="keen-slider__slide number-slide3" style="height: 115px;">3</div>
		<div class="keen-slider__slide number-slide4" style="height: 125px;">4</div>
		<div class="keen-slider__slide number-slide5" style="height: 135px;">5</div>
		<div class="keen-slider__slide number-slide6" style="height: 145px;">6</div>
	</KeenSliderRoot>

	<!-- Custom arrows -->
	<h1>Custom arrows</h1>
	<KeenSliderRoot
		options={{
			arrows: true,
			slides: { perView: 1, spacing: 15 }
		}}
		autoplayTimeoutMs="{3000},"
		plugins={[AutoplayPlugin, WheelControlsPlugin, AdaptiveHeightPlugin]}
	>
		<svg
			slot="prevArrow"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m14 16-4-4 4-4" /></svg
		>
		<svg
			slot="nextArrow"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m10 8 4 4-4 4" /></svg
		>

		<div class="keen-slider__slide number-slide1" style="height: 75px;">1</div>
		<div class="keen-slider__slide number-slide2" style="height: 100px;">2</div>
		<div class="keen-slider__slide number-slide3" style="height: 115px;">3</div>
		<div class="keen-slider__slide number-slide4" style="height: 125px;">4</div>
		<div class="keen-slider__slide number-slide5" style="height: 135px;">5</div>
		<div class="keen-slider__slide number-slide6" style="height: 145px;">6</div>
	</KeenSliderRoot>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
	}

	[class^='number-slide'],
	[class*='number-slide'] {
		background: grey;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50px;
		color: #fff;
		font-weight: 500;
		height: 300px;
		max-height: 100vh;
	}

	.number-slide1 {
		background: rgb(64, 175, 255);
		background: linear-gradient(128deg, rgba(64, 175, 255, 1) 0%, rgba(63, 97, 255, 1) 100%);
	}

	.number-slide2 {
		background: rgb(255, 75, 64);
		background: linear-gradient(128deg, rgba(255, 154, 63, 1) 0%, rgba(255, 75, 64, 1) 100%);
	}

	.number-slide3 {
		background: rgb(182, 255, 64);
		background: linear-gradient(128deg, rgba(182, 255, 64, 1) 0%, rgba(63, 255, 71, 1) 100%);
		background: linear-gradient(128deg, rgba(189, 255, 83, 1) 0%, rgba(43, 250, 82, 1) 100%);
	}

	.number-slide4 {
		background: rgb(64, 255, 242);
		background: linear-gradient(128deg, rgba(64, 255, 242, 1) 0%, rgba(63, 188, 255, 1) 100%);
	}

	.number-slide5 {
		background: rgb(255, 64, 156);
		background: linear-gradient(128deg, rgba(255, 64, 156, 1) 0%, rgba(255, 63, 63, 1) 100%);
	}
	.number-slide6 {
		background: rgb(64, 76, 255);
		background: linear-gradient(128deg, rgba(64, 76, 255, 1) 0%, rgba(174, 63, 255, 1) 100%);
	}
</style>
