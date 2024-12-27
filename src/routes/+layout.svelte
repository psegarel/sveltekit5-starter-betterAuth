<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Navbar from '$lib/components/Navbar.svelte';
	import { userState } from '$lib/states/index.svelte';
	let { data, children }: { data: PageData; children: any } = $props();

	$effect.pre(() => {
		userState.session = data.user ? true : false;
	});
</script>

<Navbar user={data.user} />
<Toaster />

{@render children()}
