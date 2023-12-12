<script lang="ts">
	import type { Classes } from './types.js';

	export let direction: 'prev' | 'next';
	export let onClick: () => void;
	export let disabled: boolean;
	export let keenClasses: Classes;

	let classes: string | undefined;
	if (direction === 'prev') {
		classes = keenClasses.arrowLeftWrapper;
	} else {
		classes = keenClasses.arrowRightWrapper;
	}
</script>

<button type="button" class={classes} on:click|preventDefault={onClick} {disabled}>
	<slot />
</button>
