<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	import { contactFormSchema, type ContactFormSchema } from './contact-form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { data }: { data: SuperValidated<Infer<ContactFormSchema>> } = $props();
	let successMessage = 'Thanks for getting in touch, we will get back to you shortly';
	let errorMessage = 'Hmmm, not sure what went wrong here, please try again later...';

	const form = superForm(data, {
		validators: zod4Client(contactFormSchema),
		onResult: ({ result }) => {
			if (result.type == 'success') {
				toast(successMessage);
			} else {
				toast(errorMessage);
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto w-full border-none shadow-none">
	<Card.Header>
		<Card.Title class="text-2xl">Contact</Card.Title>
		<Card.Description>Please use the form below to send us any enquiries</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" class="w-full space-y-4" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input placeholder="Your Name" {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input placeholder="Your Email" {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="subject">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Subject</Form.Label>
						<Input {...props} bind:value={$formData.subject} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="message">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Message</Form.Label>
						<Textarea {...props} bind:value={$formData.message} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="message">
				<Form.Button class="transition-transform duration-300 active:scale-95"
					>Send Message</Form.Button
				>
			</Form.Field>
		</form>
	</Card.Content>
</Card.Root>
