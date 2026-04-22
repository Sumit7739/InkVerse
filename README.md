# InkVerse

InkVerse is a React + Vite app prepared for deployment on Cloudflare Pages.

## Stack

- React 19 + React Router 7
- Vite 8
- Cloudflare Pages Functions
- Cloudflare D1 (relational data)
- Cloudflare R2 (image/text file objects)

## Auth Flow (Implemented)

The app now has working signup and login flow backed by D1.

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)

Passwords are hashed with PBKDF2 via Web Crypto before storage.
Successful login/signup creates a session token in the `Sessions` table.

Frontend pages wired to this flow:

- `src/pages/Signup.jsx`
- `src/pages/Login.jsx`
- `src/pages/Bookmarks.jsx`

## Database Schema

`schema.sql` includes:

- `Users`
- `Stories`
- `Sessions`
- `StoryAssets` (metadata for objects stored in R2)
- `Bookmarks`
- `Likes`
- `Comments`

## Storage Approach

Use D1 for structured relational data and R2 for binary/object content.

- Store image and chapter text files in R2.
- Store metadata and object keys in D1 (`StoryAssets.storage_key`).

`wrangler.toml` bindings:

- `DB` for D1
- `ASSETS` for R2 bucket

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Apply schema to local D1 database:

```bash
npx wrangler d1 execute inkverse-db --local --file=schema.sql
```

3. Start Cloudflare Pages dev (recommended when testing Functions + D1 + R2):

```bash
npx wrangler pages dev dist --d1=DB --r2=ASSETS
```

4. In another terminal, build and serve via Vite when needed:

```bash
npm run dev
```

For full Pages-function parity, prefer `wrangler pages dev` for API testing.

## Deploy Notes

- Build command: `npm run build`
- Output directory: `dist`
- Ensure D1 and R2 are configured in Cloudflare dashboard and match bindings.
