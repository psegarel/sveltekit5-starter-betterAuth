<script lang="ts">
	import { navbarState } from '$lib/states/index.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import UserMenu from './UserMenu.svelte';
	import type { User } from 'better-auth';

	let { user }: { user: User | undefined } = $props();
	let primaryMenu = [
		{
			name: 'Home',
			href: '/'
		}
	];
</script>

{#if navbarState.visible}
	<div
		transition:fly={{ y: -100, duration: 600, delay: 600, easing: cubicOut, opacity: 1 }}
		class="fixed left-0 top-0 z-50 flex h-16 w-screen flex-row items-center justify-between bg-zinc-200 px-4 md:px-16"
	>
		<div class="flex flex-row items-center justify-center gap-4 text-sm">
			<a class="text-xl font-semibold tracking-tight" href="/">Starter Template</a>
		</div>
		<ul class="flex flex-row items-center justify-center gap-4 text-sm">
			{#each primaryMenu as item}
				<li>
					<a href={item.href}>{item.name}</a>
				</li>
			{/each}
		</ul>
		<UserMenu {user} />
	</div>
{/if}
