import { sendMail, type EmailPayload } from '$lib/server/email';
import type { Actions } from './$types';

import type { PageServerLoad } from './$types';
import { contactFormSchema } from './contact-form-schema';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { BREVO_SMTP_FROM_EMAIL } from '$env/static/private';

export const load = (async () => {
	return {
		form: await superValidate(zod4(contactFormSchema))
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		// Validation should have been handled by zod, but you could add more validation steps here if needed.

		if (!data.get('message') && !data.get('email')) {
			return fail;
		}

		let payload: EmailPayload = {
			subject: String(data.get('subject')),

			// Alternatively, you can create a new environment variable, if you wish to receive mail on a different account
			// For instance BREVO_SMTP_TO_EMAIL=your-receiving-email@example.com
			to: BREVO_SMTP_FROM_EMAIL,

			// Feel free to format th email any way you wish
			html: `<p>${String(data.get('message'))}</p><p>Email sent by ${String(data.get('name'))}, email: ${String(data.get('email'))}</p>`
		};

		const message = await sendMail(payload);
		if (message) {
			return { success: true };
		}
	}
} satisfies Actions;
