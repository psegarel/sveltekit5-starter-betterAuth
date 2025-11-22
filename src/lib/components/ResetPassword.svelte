<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import IconEye from './IconEye.svelte';
	import IconArrowPath from './IconArrowPath.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data }: { data: SuperValidated<Infer<ResetPasswordSchema>> } = $props();
	let showPassword = $state(false);
	let resetting = $state(false);

	const form = superForm(data, {
		validators: zod4Client(resetPasswordSchema)
	});

	const { form: formData, enhance } = form;

	async function resetPassword() {
		resetting = true;
		try {
			const { data, error } = await authClient.resetPassword({
				newPassword: $formData.password
			});

			if (data) {
				resetting = false;
				await goto('/login');
				toast.success('Your password was successfully reset, please log in!');
			}
		} catch (error) {
			console.log(error);
			toast.error('There was an error, please try again later');
		}
	}
</script>

<Card.Root class="mx-auto w-full border-none shadow-none">
	<Card.Header>
		<Card.Title class="text-2xl">Reset Password</Card.Title>
		<Card.Description>Enter your details below to reset your password</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<div class="relative">
							<Input
								autocomplete="on"
								class="pl-10"
								type={showPassword ? 'text' : 'password'}
								{...props}
								bind:value={$formData.password}
							/>
							<button
								type="button"
								tabindex="-1"
								onclick={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 left-0 flex flex-col items-center justify-center rounded-l border border-zinc-200 pr-3 dark:border-zinc-800"
							>
								<span class="relative left-1 ml-0.5"
									><IconEye className="size-5 text-zinc-500" show={showPassword} /></span
								>
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-8 flex flex-row items-center justify-between">
				<div class="flex flex-row items-center justify-center gap-8">
					<Form.Button
						class="transition-all duration-300 active:scale-95 active:bg-zinc-500"
						onclick={resetPassword}
						>{#if resetting}
							<IconArrowPath size="size-4" />
						{:else}
							Reset Password
						{/if}
					</Form.Button>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
