<script lang="ts">
	import SignupForm from '$lib/components/SignupForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="grid h-screen w-screen grid-cols-1 items-center justify-center md:grid-cols-2">
	<div class="absolute right-16 top-4">
		<a class="text-sm" href="/">Home</a>
	</div>
	<div class="hidden h-screen w-full bg-zinc-900 md:block"></div>
	<div class="flex flex-col items-center justify-center px-4 lg:px-16 xl:px-32">
		<SignupForm data={data.form} />
	</div>
</div>
