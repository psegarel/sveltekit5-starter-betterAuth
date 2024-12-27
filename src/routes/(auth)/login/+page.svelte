<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	import { type PageData } from './$types';
	// import { navbarState } from '$lib/states/index.svelte';

	// $effect.pre(() => {
	// 	navbarState.visible = false;
	// });

	let { data }: { data: PageData } = $props();
</script>

<div class="grid h-screen w-screen grid-cols-1 items-center justify-center md:grid-cols-2">
	<!-- <div class="absolute right-16 top-4">
		<a class="text-sm" href="/">Home</a>
	</div> -->
	<div class="hidden h-screen w-full bg-zinc-900 md:block"></div>
	<div class="flex flex-col items-center justify-center px-4 lg:px-16 xl:px-32">
		<LoginForm data={data.form} />
	</div>
</div>
