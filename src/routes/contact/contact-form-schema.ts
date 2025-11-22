import { z } from 'zod/v4';

export const contactFormSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.email(),
	subject: z.string().min(2).max(50),
	message: z.string()
});

export type ContactFormSchema = typeof contactFormSchema;
