<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1>Welcome to SvelteKit</h1>
	<a href="/signup">Signup</a>
</div>
