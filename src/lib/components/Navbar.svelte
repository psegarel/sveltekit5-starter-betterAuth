<script lang="ts">
	import { navbarState } from '$lib/states/index.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let menu = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Login',
			href: '/login'
		},
		{
			name: 'Signup',
			href: '/signup'
		}
	];
</script>

{#if navbarState.visible}
	<div
		transition:fly={{ y: -100, duration: 600, delay: 600, easing: cubicOut, opacity: 1 }}
		class="fixed left-0 top-0 z-50 flex h-16 w-screen flex-row items-center justify-end bg-white px-4 md:px-16"
	>
		<ul class="flex flex-row items-center justify-center gap-4">
			{#each menu as item}
				<li>
					<a href={item.href}>{item.name}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
