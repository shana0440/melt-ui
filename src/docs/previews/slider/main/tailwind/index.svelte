<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
		options: { min, max },
		states: { value },
	} = createSlider({
		defaultValue: [30],
		min: 0,
		max: 100,
		step: 1,
	});

	const setMinMax = () => {
		$min = Math.random() * 100;
		$max = Math.random() * 100 + $min;
		$value = [Math.random() * 10000];
	};
</script>

<span use:melt={$root} class="relative flex h-[20px] w-[200px] items-center">
	<span class="h-[3px] w-full bg-black/40">
		<span use:melt={$range} class="h-[3px] bg-white" />
	</span>

	<span
		use:melt={$thumbs[0]}
		class="h-5 w-5 rounded-full bg-white focus:ring-4 focus:!ring-black/40"
	/>
</span>

<button on:click={setMinMax}>set min & max & value</button>
