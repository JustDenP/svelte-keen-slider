<script lang="ts">
	import type { Classes } from './types.js';

	export let sliderSlides: number;
	export let currentSlide: number;
	export let onClick: (idx: number) => void;
	export let keenClasses: Classes;
</script>

<div class={keenClasses.dotsWrapper}>
	{#each Array(sliderSlides + 1) as _, idx}
		<button type="button" class={keenClasses.dot} class:is-selected={idx === currentSlide} on:click|preventDefault={() => onClick(idx)} />
	{/each}
</div>
