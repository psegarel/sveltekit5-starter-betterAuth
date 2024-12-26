import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '$lib/server/prisma';
import { sendMail } from '$lib/server/email';
import { APP_NAME } from '$env/static/private';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendMail({
				to: user.email,
				subject: `Reset your password for ${APP_NAME}`,
				html: `<h1>Welcome to ${APP_NAME}</h1><p>Click the link to reset your password: ${url}</p>`
			});
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendMail({
				to: user.email,
				subject: 'Verify your email address',
				html: `<h1>Welcome to ${APP_NAME}</h1><p>Click the link to verify your email: ${url}</p>`
			});
		}
	},
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	})
});
