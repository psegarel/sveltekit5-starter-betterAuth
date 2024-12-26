<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import { authSchema, type AuthSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import IconEye from './IconEye.svelte';
	import IconMail from './IconMail.svelte';
	import { goto } from '$app/navigation';

	let { data }: { data: SuperValidated<Infer<AuthSchema>> } = $props();
	let showPassword = $state(false);

	const form = superForm(data, {
		validators: zodClient(authSchema)
	});

	const { form: formData, enhance } = form;

	async function login() {
		try {
			const { data } = await authClient.signIn.email({
				email: $formData.email,
				password: $formData.password
			});
			if (data) {
				goto('/');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<Card.Root class="mx-auto w-full border-none shadow-none">
	<Card.Header>
		<Card.Title class="text-2xl">Log In</Card.Title>
		<Card.Description>Enter your details below to login</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<div class="relative">
							<Input
								placeholder="name@example.com"
								class="pl-10"
								{...props}
								bind:value={$formData.email}
							/>
							<span
								class="absolute inset-y-0 left-0 flex flex-col items-center justify-center rounded-l border border-zinc-200 pr-3"
							>
								<span class="relative left-1 ml-0.5"
									><IconMail className="size-5 text-zinc-500" /></span
								>
							</span>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>
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
								class="absolute inset-y-0 left-0 flex flex-col items-center justify-center rounded-l border border-zinc-200 pr-3"
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
						type="button"
						class="transition-all duration-300 active:scale-95 active:bg-zinc-500"
						onclick={login}>Log In</Form.Button
					>
					<a href="/forgot-password" class="text-sm underline">Forgot Password</a>
				</div>

				<div class="flex flex-row items-center justify-center gap-4 text-center text-sm">
					<span>Don't have an account?</span>
					<a href="/signup" class="underline"> <span class="font-semibold">Sign Up</span> </a>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
