<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { Input } from '$lib/components/ui/input/index.js';
	import { signupSchema, type SignupSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import IconEye from './IconEye.svelte';
	import IconMail from './IconMail.svelte';

	let { data }: { data: SuperValidated<Infer<SignupSchema>> } = $props();
	let showPassword = $state(false);

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

<Card.Root class="mx-auto w-full border-none shadow-none">
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
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<div class="relative">
							<Input
								autocomplete="on"
								class="pl-10"
								type={showPassword ? 'text' : 'password'}
								{...props}
								bind:value={$formData.confirmPassword}
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
				<Form.Button
					class="transition-all duration-300 active:scale-95 active:bg-zinc-500"
					onclick={signup}>Submit</Form.Button
				>
				<div class="text-center text-xs">
					Already have an account?
					<a href="/login" class="underline"> <span class="text-sm font-bold">Log In</span> </a>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
