<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import UserMenu from './UserMenu.svelte';
	import type { User } from 'better-auth';
	import MobileMenu from './MobileMenu.svelte';
	import IconSun from './IconSun.svelte';
	import IconMoon from './IconMoon.svelte';
	import { toggleMode } from 'mode-watcher';

	let { user }: { user: User | undefined } = $props();
	let primaryMenu = [
		{
			name: 'Home',
			href: '/'
		}
	];
</script>

<div
	transition:fly={{ y: -100, duration: 600, delay: 600, easing: cubicOut, opacity: 1 }}
	class="fixed z-50 hidden h-16 w-screen items-center justify-between bg-transparent px-4 md:flex md:flex-row md:px-16"
>
	<div class="flex w-1/2 flex-row items-center justify-start gap-4 text-sm">
		<a class="text-xl font-semibold tracking-tight" href="/">Starter Template</a>
	</div>
	<div class="flex h-16 flex-row items-center justify-center gap-4">
		<ul
			class="flex flex-row items-center justify-end gap-4 border-r border-zinc-400 pr-4 text-sm dark:border-zinc-200"
		>
			{#each primaryMenu as item}
				<li>
					<a href={item.href}>{item.name}</a>
				</li>
			{/each}
		</ul>
		<UserMenu {user} />
		<button onclick={toggleMode} class="relative h-16">
			<IconSun
				className="h-[1.2rem] w-[1.2rem] top-6 left-0 rotate-0 scale-100 absolute transition-all dark:-rotate-90 dark:scale-0"
			/>
			<IconMoon
				className="absolute h-[1.2rem] w-[1.2rem] top-6 left-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
		</button>
	</div>
</div>

<MobileMenu menu={primaryMenu} />
