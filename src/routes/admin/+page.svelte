<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="text-4xl font-black tracking-tight">Admin</h1>
	<p>This is a protected route</p>
</div>
