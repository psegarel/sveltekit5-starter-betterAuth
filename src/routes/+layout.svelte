<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Navbar from '$lib/components/Navbar.svelte';

	let { data, children }: { data: PageData; children: any } = $props();
</script>

<Navbar />
<Toaster />

{@render children()}
