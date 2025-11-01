<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import Navbar from '$lib/components/Navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { browser } from '$app/environment';

	let { data, children }: { data: PageData; children: any } = $props();
</script>

<Navbar user={data.user} />

<Toaster />

<!-- Avoids the hydration issue by adding a browser condition -->
{#if browser}
	<ModeWatcher />
{/if}
{@render children()}
