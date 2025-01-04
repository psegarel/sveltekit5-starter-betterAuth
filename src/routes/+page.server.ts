import type { SeoData } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const seo: SeoData = {
		id: '',
		reference: 'home',
		title: 'Home | Starter Template',
		description: 'SvelteKit 5 Starter Template built with TailwindCSS, BetterAuth & more...',
		imageUrl: 'https://unsplash.com/photos/monitor-showing-java-programming-OqtafYT5kTw'
	};
	return {
		seo,
		user: locals.user
	};
}) satisfies PageServerLoad;
