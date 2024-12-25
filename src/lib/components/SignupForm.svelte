<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { Input } from '$lib/components/ui/input/index.js';
	import { signupSchema, type SignupSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import IconEye from './IconEye.svelte';

	let { data }: { data: SuperValidated<Infer<SignupSchema>> } = $props();
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	const form = superForm(data, {
		validators: zodClient(signupSchema)
	});

	const { form: formData, enhance } = form;

	async function signup() {
		try {
			const { data } = await authClient.signUp.email({
				email: $formData.email,
				password: $formData.password,
				name: $formData.name
			});
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign Up</Card.Title>
		<Card.Description>Enter your details below to create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<div class="relative">
							<Input
								type={showPassword ? 'text' : 'password'}
								{...props}
								bind:value={$formData.password}
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3"
							>
								<IconEye show={showPassword} />
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<div class="relative">
							<Input
								type={showConfirmPassword ? 'text' : 'password'}
								{...props}
								bind:value={$formData.confirmPassword}
							/>
							<button
								type="button"
								onclick={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3"
							>
								<IconEye show={showConfirmPassword} />
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-8 flex flex-row items-center justify-between">
				<Form.Button onclick={signup}>Submit</Form.Button>
				<div class="text-center text-xs">
					Already have an account?
					<a href="/login" class="underline"> <span class="text-sm font-bold">Log In</span> </a>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
