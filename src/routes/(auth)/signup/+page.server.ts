import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$lib/auth/schema';

export const load = (async () => {
	return {
		form: await superValidate(zod4(signupSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		// Nothing happens here, signup is handled on by better-auth authClient.signUp.email()
		// Since we're using a form, the action is needed to avoid a Method Not Allowed 405 error.
	}
};
