<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen w-screen items-start justify-center">
	<div class="py-40">
		<h1 class="text-2xl font-bold">Email Verification</h1>
		<p class="text-sm text-zinc-500">Please check your email for a verification link.</p>
	</div>
</div>
