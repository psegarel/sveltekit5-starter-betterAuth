import type { PageServerLoad } from './$types';
import { contactFormSchema } from './contact-form-schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	return {
		form: await superValidate(zod(contactFormSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		// Nothing happens here, login is handled in the client, but the login button is a submit button, so we need to handle it here to avoid any errors
	}
};
