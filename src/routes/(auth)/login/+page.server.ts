import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { authSchema } from '$lib/auth/schema';

export const load = (async () => {
	return {
		form: await superValidate(zod(authSchema))
	};
}) satisfies PageServerLoad;
