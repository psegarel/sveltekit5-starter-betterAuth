<script lang="ts">
	import type { PageData } from './$types';
	import ForgotPasswordForm from '$lib/components/ForgotPasswordForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="grid h-screen w-screen grid-cols-1 items-center justify-center md:grid-cols-2">
	<div class="hidden h-screen w-full bg-zinc-900 md:block"></div>
	<div class="flex flex-col items-center justify-center px-4 lg:px-16 xl:px-32">
		<ForgotPasswordForm data={data.form} />
	</div>
</div>
