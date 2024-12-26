<script lang="ts">
	import { navbarState } from '$lib/states/index.svelte';

	$effect.pre(() => {
		navbarState.visible = true;
	});
</script>
