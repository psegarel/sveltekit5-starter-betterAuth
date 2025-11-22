# 🛠️ SvelteKit 5 Starter Template

I got tired of setting up the same tools over and over, so I started to build this template, planning to use it as a base for my upcoming projects. Hopefully it'll make life easier for anyone starting a new SvelteKit project.

It bundles together some of my favorite tools:

- SvelteKit 5
- TailwindCSS
- Prisma & Prisma Postgres ( Prisma Postgres offers a free plan, no cold starts! But feel free to use any other Prisma compatible database )
- Shadcn/UI
- Better-Auth, at the time of writing my favorite auth option for SvelteKit
- zod version 4

Right now it has authentication working, user signup with email verification, login & logout with the necesssary email features using Brevo ( Free Plan offers 300 daily emails at the time of writing). Better Auth offers a lot more of course but this template should get you going.

I'm still improving this template, and I hope it helps others skip the setup part and get straight to building cool stuff. Use it, break it, or make it better!

If this sounds useful, feel free to check it out and let me know what you think. Always happy to get feedback or suggestions!

## Setup

1. Clone the repository
2. Run `pnpm install` ( or your package manager of choice...)

## Database

(PostgreSQL, if you want to use another database, you need to change the adapter in the prisma/schema.prisma file)

1. Add your database url to the .env file
2. Initialize your database & generate the Prisma Client

```
   pnpx prisma migrate dev --name init
   pnpx prisma generate
```

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

I'm using Brevo for the email service.
You will need to implement your own sendMail function in the src/lib/server/email/index.ts file to use another email service.

2. Add your email credentials to the .env file

```
BREVO_SMTP_HOST=
BREVO_SMTP_PORT=
BREVO_SMTP_USER=
BREVO_SMTP_KEY=
BREVO_SMTP_FROM_EMAIL=
```

3. Add your app name

```
APP_NAME="Starter Auth Template"
```

## Mode Watcher

4. Added the ModeWatcher component to the src/routes/+layout.svelte file, to enable the dark mode.

## Metatags

See usage in +page.server.ts & +page.svelte.
Basic usage would be to save the SeoData for each routes in the database, then retrieve it in each route +page.server.ts, then add the Metatags component in each route that returns data.seo

## Finally

```
   pnpm dev --open
```
