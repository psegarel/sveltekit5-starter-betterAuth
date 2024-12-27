<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	import { type PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="grid h-screen w-screen grid-cols-1 items-center justify-center md:grid-cols-2">
	<div class="hidden h-screen w-full bg-zinc-900 md:block"></div>
	<div class="flex flex-col items-center justify-center px-4 lg:px-16 xl:px-32">
		<LoginForm data={data.form} />
	</div>
</div>
