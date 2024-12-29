# 🛠️ SvelteKit 5 Starter Template

I got tired of setting up the same tools over and over, so I build this template, planning to use it as a base for my upcoming projects. Hopefully it'll make life easier for anyone starting a new SvelteKit project.

It bundles together some of my favorite tools:

- SvelteKit 5
- TailwindCSS
- Prisma & Prisma Postgres ( Prisma Postgres offers a free plan, no cold starts! )
- Shadcn/UI
- Better-Auth (because who wants to build auth from scratch?)

Right now it has authentication working, user signup with email verification, login & logout with the necesssary email features using Brevo ( Free Plan offers 300 daily emails at the time of writing). Better Auth offers a lot more of course but this template should get you going.

I'm planning to add SEO stuff soon too!

I'm still improving this template, and I hope it helps others skip the setup part and get straight to building cool stuff. Feel free to use it, break it, or make it better!

If this sounds useful, feel free to check it out and let me know what you think. Always happy to get feedback or suggestions!

## Setup

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm dev --open`

## Database

(PostgreSQL, if you want to use another database, you need to change the adapter in the prisma/schema.prisma file)

1. Add your database url to the .env file

## Authentication

1. Generate a secret key for the auth & add it to the .env file

```
   BETTER_AUTH_SECRET=
```

2. Add your base url to the .env file

```
   BETTER_AUTH_URL=http://localhost:5173 #Base URL of your app
```

## Email

I'm using Brevo for the email service, at the time of writing, the free plan allows to send 300 emails per day.
You will need to implement your own sendMail function in the src/lib/server/email/index.ts file to use another email service.

1. Add your email credentials to the .env file

```
VITE_SMTP_HOST=
VITE_SMTP_PORT=
VITE_SMTP_USER=
VITE_SMTP_KEY=
VITE_SMTP_FROM_EMAIL=
```

## Mode Watcher

1. Added the ModeWatcher component to the src/routes/+layout.svelte file, to enable the dark mode.
