<script lang="ts">
	import type { User } from 'better-auth';
	import { authClient } from '$lib/auth/client';
	import IconArrowRightStartOnRectangle from './IconArrowRightStartOnRectangle.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { user }: { user: User | undefined } = $props();

	let secondaryMenu = [
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

<ul class="flex flex-row items-center justify-center gap-4 text-sm">
	{#if !user}
		{#each secondaryMenu as item}
			<li>
				<a href={item.href}>{item.name}</a>
			</li>
		{/each}
	{:else}
		<li>
			<button
				onclick={async () => {
					try {
						await authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									goto('/login');
									toast.success('You have been logged out');
								}
							}
						});
					} catch (error) {}
				}}
			>
				<IconArrowRightStartOnRectangle />
			</button>
		</li>
	{/if}
</ul>
