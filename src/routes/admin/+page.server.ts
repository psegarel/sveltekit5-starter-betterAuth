import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { USER_DEPENDENCY_KEY } from '$lib/constants/index';

export const load: PageServerLoad = async ({ request, locals, depends }) => {
	depends(USER_DEPENDENCY_KEY);
	if (!locals.user) {
		redirect(302, '/login');
	}
	return {};
};
