<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Field } from 'formsnap';
	import { contactFormSchema, type ContactFormSchema } from './contact-form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: SuperValidated<Infer<ContactFormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(contactFormSchema)
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" class="w-full space-y-4 p-8" use:enhance>
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
		<Form.Button class="transition-transform duration-300 active:scale-95">Send Message</Form.Button
		>
	</Form.Field>
</form>
