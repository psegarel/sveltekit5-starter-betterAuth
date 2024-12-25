import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export async function handle({ event, resolve }) {
	const { request } = event;
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session && session.user) {
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth });
}
