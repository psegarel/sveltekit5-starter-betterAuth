# Starter Template

SvelteKit with TailwindCSS, Prisma, Shadcn/UI and Better-Auth

## Setup

1. Clone the repository 2. Run `pnpm install` 3. Run `pnpm dev --open`

## Database

(PostgreSQL, if you want to use another database, you need to change the adapter in the prisma/schema.prisma file)

1. Add your database url to the .env file

## Authentication

1. Generate a secret key for the auth & add it to the .env file
   BETTER_AUTH_SECRET=
2. Add your base url to the .env file
   BETTER_AUTH_URL=http://localhost:5173 #Base URL of your app
