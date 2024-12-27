<script lang="ts">
	import type { PageData } from './$types';
	import { navbarState, userState } from '$lib/states/index.svelte';

	let { data }: { data: PageData } = $props();

	userState.session = data.user ? true : false;

	$effect.pre(() => {
		navbarState.visible = true;
	});
</script>
