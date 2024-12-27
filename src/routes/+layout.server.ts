import type { LayoutServerLoad } from './$types';
import { USER_DEPENDENCY_KEY } from '$lib/constants/index';

export const load = (async ({ locals, depends }) => {
	depends(USER_DEPENDENCY_KEY); // Register the dependency
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
