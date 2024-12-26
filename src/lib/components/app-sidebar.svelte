<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	// This is sample data.
	const data = {
		navMain: [
			{
				title: 'Home',
				url: '/',
				isActive: true
			},
			{
				title: 'Account',
				url: '/login',
				isActive: false,
				items: [
					{
						title: 'Log In',
						url: '/login',
						isActive: false
					},
					{
						title: 'Sign Up',
						url: '/signup',
						isActive: false
					}
				]
			}
		]
	};

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Menu</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each data.navMain as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="font-medium">
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										{item.title}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
							{#if item.items?.length}
								<Sidebar.MenuSub>
									{#each item.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton href={subItem.url} isActive={subItem.isActive}>
												{subItem.title}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							{/if}
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
