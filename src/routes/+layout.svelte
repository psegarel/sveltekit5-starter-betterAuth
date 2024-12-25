<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	let { data, children }: { data: PageData; children: any } = $props();

	console.log(data.user);
</script>

{@render children()}
