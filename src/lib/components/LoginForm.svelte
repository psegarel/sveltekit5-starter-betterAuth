<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { Input } from '$lib/components/ui/input/index.js';
	import { authSchema, type AuthSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import IconEye from './IconEye.svelte';
	import PasswordInput from './PasswordInput.svelte';

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
			console.log(data);
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
						<Input {...props} bind:value={$formData.email} />
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
								type={showPassword ? 'text' : 'password'}
								{...props}
								bind:value={$formData.password}
							/>
							<button
								type="button"
								tabindex="-1"
								onclick={() => (showPassword = !showPassword)}
								class=" absolute inset-y-0 right-0 flex items-center pr-3"
							>
								<IconEye show={showPassword} />
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-8 flex flex-row items-center justify-between">
				<Form.Button onclick={login}>Log In</Form.Button>
				<div class="text-center text-xs">
					Don't have an account?
					<a href="/signup" class="underline"> <span class="text-sm font-bold">Sign Up</span> </a>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
