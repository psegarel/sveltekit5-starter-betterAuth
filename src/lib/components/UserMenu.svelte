<script lang="ts">
	import type { User } from 'better-auth';
	import { authClient } from '$lib/auth/client';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import IconUser from './IconUser.svelte';
	import { USER_DEPENDENCY_KEY } from '$lib/constants/index';
	import { invalidate } from '$app/navigation';

	let { user }: { user?: User | undefined } = $props();
</script>

{#if !user}
	<div class="flex flex-row gap-4 pr-4 text-xs font-semibold">
		<a href="/login">Login</a>
		<a href="/signup">Signup</a>
	</div>
{/if}

{#if user}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger><IconUser /></DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item onclick={() => goto('/admin')}>Admin</DropdownMenu.Item>
				<DropdownMenu.Item
					onclick={async () => {
						try {
							await authClient.signOut({
								fetchOptions: {
									onSuccess: async () => {
										goto('/login');
										await invalidate(USER_DEPENDENCY_KEY);
										toast.success('You have been logged out');
									}
								}
							});
						} catch (error) {}
					}}
				>
					Logout
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
