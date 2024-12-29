<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen w-screen items-start justify-center">
	<div class="flex flex-col gap-4 py-40">
		<h1 class="text-2xl font-bold">Email Verification</h1>
		{#if data.user}
			<p class="text-sm text-zinc-500">
				Thank you {data.user.name} for verifying your email. You are now logged in!
			</p>
		{/if}
		<Button onclick={() => goto('/admin')}>Admin</Button>
	</div>
</div>
