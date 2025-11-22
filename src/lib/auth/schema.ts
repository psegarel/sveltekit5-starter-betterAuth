import { z } from 'zod/v4';

export const forgotPasswordSchema = z.object({
	email: z.email()
});

export const resetPasswordSchema = z.object({
	password: z.string().min(8).max(50)
});

export const signupSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50),
		name: z.string().min(2).max(50)
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});
export const authSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50),
		name: z.string().min(2).max(50)
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});

export type SignupSchema = typeof signupSchema;
export type AuthSchema = typeof authSchema;
export type ForgotPasswordSchema = typeof forgotPasswordSchema;
export type ResetPasswordSchema = typeof resetPasswordSchema;
