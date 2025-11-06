# TypeScript Backend Template

Opinionated Express + TypeScript starter you can drop into new projects. It includes a ready-to-use auth flow, role-based middleware, layered architecture, and Mongoose integration.

## Highlights
- Express server with `/health` probe and class-based `/api` router registry
- JWT auth (register, login, current user) backed by bcrypt + role-based guard
- Clean layering: controllers → services → repositories → schemas
- Shared Mongoose `BaseModel` with `mongoose-easy-paginate` helpers
- Socket.IO bootstrap wired to an empty `setupListeners` hook
- Class-based route modules and registry mirroring the health-asia pattern
- Zod validation middleware, async error handler, central constants
- ESM TypeScript config and `tsx`-powered dev workflow

## Getting Started
1. Copy `.env.example` to `.env` and set `ACCESS_TOKEN_SECRET`, `MONGO_URI`, etc.
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Build for production: `npm run build` then `npm start`

Ensure a MongoDB instance is reachable via `MONGO_URI` before starting. The Socket.IO server boots with the HTTP server; add event handlers in `src/socket/listeners.ts` and register additional route groups in `src/routes/index.ts`.

## Sample API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users/:id` (admin only example)

Swap or extend schemas, repositories, services, and routes to fit your domain while reusing the shared infrastructure.
