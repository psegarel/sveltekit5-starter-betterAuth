<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import IconEye from './IconEye.svelte';
	import type { FsSuperForm } from 'formsnap';

	let show = $state(false);

	let {
		form,
		name,
		label,
		value
	}: {
		form: FsSuperForm<Record<string, unknown>, any>;
		name: string;
		label: string;
		value: string;
	} = $props();
</script>

<Form.Field {form} {name}>
	<Form.Control>
		<Form.Label>{label}</Form.Label>
		<div class="relative">
			<Input type={show ? 'text' : 'password'} bind:value />
			<button
				type="button"
				onclick={() => (show = !show)}
				class="absolute inset-y-0 right-0 flex items-center pr-3"
			>
				<IconEye {show} />
			</button>
		</div>
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
