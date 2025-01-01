import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	subject: z.string().min(2).max(50),
	message: z.string()
});

export type ContactFormSchema = typeof contactFormSchema;
