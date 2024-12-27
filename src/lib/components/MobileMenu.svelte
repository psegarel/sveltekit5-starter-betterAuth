<script lang="ts">
	import IconBurger from './IconBurger.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { menu }: { menu: any[] } = $props();
	let menuVisible = $state(false);

	function toggleMenu() {
		menuVisible = !menuVisible;
	}
</script>

<div class="flex h-16 w-screen flex-row items-center justify-end px-4 md:hidden">
	<button onclick={toggleMenu}>
		<IconBurger />
	</button>
</div>
{#if menuVisible}
	<div
		transition:fly={{ x: '100vw', duration: 600, delay: 200, easing: cubicOut, opacity: 1 }}
		class="fixed z-50 flex h-screen w-screen flex-col items-center justify-center bg-black text-white"
	>
		<ul>
			{#each menu as item}
				<li>
					<a onclick={toggleMenu} href={item.href}>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
