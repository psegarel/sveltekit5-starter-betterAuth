# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit 5 starter template with Better-Auth authentication, Prisma ORM, TailwindCSS, and shadcn-svelte UI components.

## Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview                # Preview production build

# Code quality
pnpm check                  # Run svelte-check for type errors
pnpm lint                   # Run prettier + eslint
pnpm format                 # Auto-format code

# Database
pnpm prisma migrate dev     # Run migrations
pnpm prisma generate        # Generate Prisma client
pnpm prisma studio          # Open Prisma Studio GUI
```

## Architecture

### Authentication Flow
- **Better-Auth** handles all authentication via `src/lib/server/auth/index.ts`
- Auth hooks in `src/hooks.server.ts` extract session and populate `event.locals.user`
- Client-side auth client at `src/lib/auth/client.ts`
- Auth routes under `src/routes/(auth)/` - login, signup, email verification, password reset

### Server-side Structure
- `src/lib/server/auth/` - Better-Auth configuration with Prisma adapter
- `src/lib/server/prisma/` - Prisma client with Accelerate extension
- `src/lib/server/email/` - Email sending via Brevo/Nodemailer

### Database
- PostgreSQL via Prisma (see `prisma/schema.prisma`)
- Models: User, Session, Account, Verification, SeoData
- Uses Prisma Accelerate for connection pooling

### UI Components
- shadcn-svelte components in `src/lib/components/ui/`
- Custom components in `src/lib/components/`
- Forms use sveltekit-superforms with Zod v4 validation

### Environment Variables
Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret key
- `BETTER_AUTH_URL` - Base URL (e.g., http://localhost:5173)
- `BREVO_SMTP_*` - Email service credentials
- `APP_NAME` - Application name for emails

## Key Patterns

- Route groups: `(auth)` for authentication pages
- SEO data stored in database, retrieved in `+page.server.ts`, rendered via `Metatags` component
- Dark mode via `mode-watcher` in root layout
- Zod v4 schemas for form validation (import from `zod/v4`, use `z.email()` primitive)
