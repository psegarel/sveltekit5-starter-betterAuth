<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	let { data, children }: { data: PageData; children: any } = $props();
</script>

<Toaster />

{@render children()}
