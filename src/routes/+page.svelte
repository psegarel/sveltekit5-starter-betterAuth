<script lang="ts">
	import type { PageData } from './$types';
	import { userState } from '$lib/states/index.svelte';
	import Metatags from '$lib/components/Metatags.svelte';

	let { data }: { data: PageData } = $props();

	userState.session = data.user ? true : false;
</script>

{#if data.seo}
	<Metatags seo={data.seo} />
{/if}
