import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import {
	BREVO_SMTP_HOST,
	BREVO_SMTP_FROM_EMAIL,
	BREVO_SMTP_KEY,
	BREVO_SMTP_USER,
	BREVO_SMTP_PORT
} from '$env/static/private';

export interface EmailPayload {
	to: string | string[];
	from?: string; // Will default to BREVO_SMTP_FROM_EMAIL if not provided
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
	host: BREVO_SMTP_HOST,
	port: Number(BREVO_SMTP_PORT),
	secure: false, // true for 465, false for other ports
	auth: {
		user: BREVO_SMTP_USER,
		pass: BREVO_SMTP_KEY
	}
});

export async function sendMail(payload: EmailPayload): Promise<boolean> {
	const mailOptions: SendMailOptions = {
		from: BREVO_SMTP_FROM_EMAIL,
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
