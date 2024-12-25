import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$lib/auth/schema';

export const load = (async () => {
	return {
		form: await superValidate(zod(signupSchema))
	};
}) satisfies PageServerLoad;
