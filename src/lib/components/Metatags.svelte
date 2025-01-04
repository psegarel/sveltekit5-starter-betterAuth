<script lang="ts">
	import { page } from '$app/state';

	import type { SeoData } from '@prisma/client';
	let { seo }: { seo: SeoData } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	{#if seo}
		<title>{seo.title}</title>
	{/if}
	<link rel="canonical" href={page.url.href} />
	{#if seo}
		<meta name="title" content={seo.title} />
		<meta name="description" content={seo.description} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />

	{#if seo}
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:image" content={seo.imageUrl} />
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={page.url.href} />

	{#if seo}
		<meta property="twitter:title" content={seo.title} />
		<meta property="twitter:description" content={seo.description} />
		<meta property="twitter:image" content={seo.imageUrl} />
	{/if}
</svelte:head>
