<script lang="ts">
	import SignupForm from '$lib/components/SignupForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen w-screen items-center justify-center px-4">
	<SignupForm data={data.form} />
</div>
