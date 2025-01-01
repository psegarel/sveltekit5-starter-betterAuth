import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';

export interface EmailPayload {
	to: string | string[];
	from?: string; // Will default to VITE_SMTP_FROM_EMAIL if not provided
	subject: string;
	text?: string; // Plain text version
	html?: string; // HTML version
	cc?: string | string[];
	bcc?: string | string[];
	replyTo?: string;
	attachments?: Array<{
		filename: string;
		content: Buffer | string;
		contentType?: string;
	}>;
	headers?: { [key: string]: string };
}
// Create transporter once and reuse
const transporter = nodemailer.createTransport({
	host: import.meta.env.VITE_SMTP_HOST,
	port: import.meta.env.VITE_SMTP_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
		user: import.meta.env.VITE_SMTP_USER,
		pass: import.meta.env.VITE_SMTP_KEY
	}
});

export async function sendMail(payload: EmailPayload): Promise<boolean> {
	const mailOptions: SendMailOptions = {
		from: import.meta.env.VITE_SMTP_FROM_EMAIL,
		to: payload.to,
		subject: payload.subject,
		html: payload.html
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return true;
	} catch (error) {
		console.error('Error sending email:', error);
		return false;
	}
}
