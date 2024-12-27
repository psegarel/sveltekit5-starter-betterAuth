<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { forgotPasswordSchema, type ForgotPasswordSchema } from '$lib/auth/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth/client';
	import { toast } from 'svelte-sonner';

	import IconMail from './IconMail.svelte';

	let { data }: { data: SuperValidated<Infer<ForgotPasswordSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(forgotPasswordSchema)
	});
	const { form: formData, enhance, errors } = form;

	async function sendResetPasswordEmail() {
		if ($errors.email) return;
		try {
			const { data, error } = await authClient.forgetPassword({
				email: $formData.email,
				redirectTo: '/reset-password'
			});
			if (data) {
				toast('Please check your email for a link to reset your password.');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<Card.Root class="mx-auto w-full border-none shadow-none">
	<Card.Header>
		<Card.Title class="text-2xl">Forgot Password</Card.Title>
		<Card.Description>Enter your email below to reset your password</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
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
								class="absolute inset-y-0 left-0 flex flex-col items-center justify-center rounded-l border border-zinc-200 pr-3 dark:border-zinc-800"
							>
								<span class="relative left-1 ml-0.5"
									><IconMail className="size-5 text-zinc-500" /></span
								>
							</span>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Button
				class="transition-all duration-300 active:scale-95 active:bg-zinc-500"
				type="button"
				disabled={$errors.email ? true : false}
				onclick={sendResetPasswordEmail}>Submit</Form.Button
			>
		</form>
	</Card.Content>
</Card.Root>
